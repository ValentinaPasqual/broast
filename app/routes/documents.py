# app/routes/documents.py - the documents catalogue 

from flask import Blueprint, render_template, request, jsonify
from app import endpoint_configuration, set_prefixes
import pandas as pd
from collections import Counter
import plotly.express as px

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
docs_bp = Blueprint('documents', __name__)

# Template which addresses SPARQL pattern to retrieve all available logical statuses
knowledge_type_query_builder = {
    'currenlty_disputed' : {
        'prefix': 'PREFIX conj:<https://w3id.org/conjectures/>',
        'keyword': 'CONJ',
        'filters': 'FILTER NOT EXISTS {?g2 conj:settles ?g}'
    },
    'currently_valid' : {
        'prefix':'',
        'keyword': 'GRAPH',
        'filters': ''
    },
    'debated' : {
        'prefix':'',
        'keyword': 'CONJ',
        'filters': ''
    },
    'settled': {
        'prefix':'',
        'keyword': 'SETT',
        'filters': ''
    },
    'undisputed': {
        'prefix':'PREFIX conj:<https://w3id.org/conjectures/>',
        'keyword': 'GRAPH',
        'filters': 'FILTER NOT EXISTS {?g conj:settles ?g2}'
    }
}

# Starts the catalogue when no filer is activated in front-end
def start(knowledge_type_query_builder):

    # BUILDS THE CATALOGUE by selecting all documents in the collection
    sparql_query = prefixes + """
    SELECT DISTINCT ?s ?o ?abstract (COUNT(DISTINCT ?g) as ?n) 
    WHERE { 
        ?s dct:title ?o. 
        FILTER (lang(?o) = 'en')
        OPTIONAL {
            ?s dct:description ?abstract. 
            FILTER (lang(?abstract) = 'en')
        }. 
        CONJ ?g {?s ?p2 ?o2} 
        } 
    GROUP BY ?s ?o ?abstract ORDER BY DESC (?n)
    """
    results = sparql_api.execute_get_select_query(repository, query=sparql_query)

    # cleans the results
    result_cards = []
    for row in results['results']['bindings']:
        temp = {}
        for k,v in row.items():
            temp.update({k:v['value']})
        result_cards.append(temp)

    # available facets 
    facets = [
            'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
            'http://purl.org/dc/terms/creator',
            'http://purl.org/dc/terms/date',
            'http://purl.org/dc/terms/coverage',
    ]

    new_facets = {}

    # checks available logical status (LS) for available facets
    # limits the SPARQL query result to 1, if a result exists then saves the available LSs in new_facets
    for facet in facets:
        temp = []
        for knowledge_type, query_elements in knowledge_type_query_builder.items():
            knowledge_type_exists_query = prefixes + """
            [[PREFIXES]]

            ASK { 
                ?s a fabio:ArchivalDocument.
                [[KEY]] ?g {
                    ?s <[[METADATA]]> ?o . 
                    [[FILTERS]]
                } 
            }
            """  
            knowledge_type_exists_query = knowledge_type_exists_query.replace('[[PREFIXES]]', query_elements['prefix'])
            knowledge_type_exists_query = knowledge_type_exists_query.replace('[[FILTERS]]',  query_elements['filters'])
            knowledge_type_exists_query = knowledge_type_exists_query.replace('[[METADATA]]', facet)
            knowledge_type_exists_query = knowledge_type_exists_query.replace('[[KEY]]', query_elements['keyword'])
            
            knowledge_type_exists = sparql_api.execute_get_select_query(repository, query=knowledge_type_exists_query)

            print(knowledge_type_exists)
            if knowledge_type_exists['boolean'] == True:
                temp.append(knowledge_type)
                
        # Query for the property label
        property_label_query = f"{prefixes} SELECT ?label WHERE {{ <{facet}> rdfs:label ?label }}"
        property_label = sparql_api.execute_get_select_query(repository, query=property_label_query)
        property_label = property_label['results']['bindings'][0]['label']['value']
        new_facets[facet] = {'label': property_label, 'available_knowledge_types': temp}

    return result_cards, new_facets

# function to clean selected archival records from the catalogue when the filter function is activated
def result_cards_handler(query_result):
    result_cards = []
    for row in query_result['results']['bindings']:
        temp = {}
        for k,v in row.items():
            temp.update({k:v['value']})
        result_cards.append(temp)
    return result_cards

# handles the filtering function toggled in the front-end
@docs_bp.route('/filter', methods=['GET', 'POST'])
def filter():

    # Access form data - gets parameter for filtering (selected facet and knolwedge type)
    selected_knowledge_type = request.form.get('selected_knowledge_type', '')
    selected_matadata_field = request.form.get('selected_matadata_field', '')
    selected_value = request.form.get('selected_value', '')

    # Handles if a filtered value is toggled in the query
    if selected_value == '':
       
        # performs a SPARQL query to retrieve matching archival sources (and their metadata) on behalf of selected parameters
        filter_query = prefixes + """
        [[PREFIXES]]
        SELECT ?s ?o ?abstract ?obj ?obj_label ?start 
        WHERE { 
            ?s dct:title ?o;
                a fabio:ArchivalDocument . 
            OPTIONAL {
                ?s dct:description ?abstract. 
                FILTER (lang(?abstract) = 'en')
            }.
            [[KEY]] ?g {
            ?s <[[METADATA]]> ?obj .
            } 
            ?obj rdfs:label|dct:title ?obj_label. 
            [[FILTERS]]
            FILTER (lang(?o) = 'en') 
            OPTIONAL {?obj time:hasBeginning ?start}
            } 
            GROUP BY ?s ?o ?abstract ?obj ?obj_label ?start ORDER BY ASC (?start) ASC (?obj_label)
        """
    else:
        filter_query = prefixes + """
        [[PREFIXES]]
        SELECT ?s ?o ?abstract ?obj ?obj_label ?start 
        WHERE { 
            ?s dct:title ?o;
                a fabio:ArchivalDocument . 
            OPTIONAL {
                ?s dct:description ?abstract. 
                FILTER (lang(?abstract) = 'en')
            }.
            OPTIONAL {
                [[KEY]] ?g2 {
                ?s <[[METADATA]]> ?obj .
                } 
                ?obj rdfs:label|dct:title ?obj_label. 
            }
            [[KEY]] ?g {
            ?s <[[METADATA]]> <[[VALUE]]> .
            } 
            FILTER (lang(?o) = 'en') 
            OPTIONAL {<[[VALUE]]> time:hasBeginning ?start}
            } 
            GROUP BY ?s ?o ?abstract ?obj ?obj_label ?start ORDER BY ASC (?start) ASC (?obj_label)
        """
    
    filter_query = filter_query.replace('[[PREFIXES]]', knowledge_type_query_builder[selected_knowledge_type]['prefix'])
    filter_query = filter_query.replace('[[KEY]]', knowledge_type_query_builder[selected_knowledge_type]['keyword'])
    filter_query = filter_query.replace('[[METADATA]]', selected_matadata_field)
    filter_query = filter_query.replace('[[FILTERS]]', knowledge_type_query_builder[selected_knowledge_type]['filters'])
    filter_query = filter_query.replace('[[VALUE]]', selected_value)

    filter_results = sparql_api.execute_get_select_query(repository, query=filter_query)
    result_cards = result_cards_handler(filter_results)
    
    facet_elements = []
    seen = set()

    # cleans the result, removes duplicates
    if selected_value == '':
        for card in result_cards:
            current_dict = {'property': card['obj'], 'label': card['obj_label']}
            dict_tuple = tuple(current_dict.items())
            
            if dict_tuple not in seen:
                seen.add(dict_tuple)
                facet_elements.append(current_dict)

    print(len(result_cards))
    
    return jsonify(result_cards=result_cards, facet_elements=facet_elements)

# handles the documents route
@docs_bp.route("/documents/", methods=["GET", "POST"])
def documents():

    # launchs the catalogue
    result_cards, new_facets = start(knowledge_type_query_builder)

    return render_template("documents.html", result_cards=result_cards, new_facets=new_facets)




