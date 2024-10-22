# app/routes/document.py - page for each documents of the collection 

from flask import Blueprint, render_template, request, jsonify
from app import endpoint_configuration, set_prefixes

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
doc_bp = Blueprint('document', __name__)

# function to get URIs labels
def get_label(uri):
    query = prefixes + f"""
    SELECT ?label 
    WHERE {{ 
        <{uri}> rdfs:label|rdfs:description|dct:title ?label 
    }}
    """
    result = sparql_api.execute_get_select_query(repository, query=query)

    return result['results']['bindings'][0]['label']['value'] if result['results']['bindings'] else ""

# function to execute SPARQL queries
def execute_sparql_query(query):
    return sparql_api.execute_get_select_query(repository, query=query)

# Updated function to process claim items and group data
def process_claims(claims, settled_claim):
    grouped_data = {}

    # Initialize a dictionary to hold unique qualifiers
    qualifiers_dict = {}

    # Get the qualifiers
    for item in claims['results']['bindings']:
        if 'qualifier' in item:
            p_value = item['p']['value']
            o_value = item['o']['value']
            qualifier_value = item['qualifier']['value']
            
            # Create a key based on p and o values
            key = (p_value, o_value)
            
            # If the key is not in the dictionary, initialize it with an empty list
            if key not in qualifiers_dict:
                qualifiers_dict[key] = []
            
            # Append the qualifier only if it's not already in the list
            if qualifier_value not in qualifiers_dict[key]:
                qualifiers_dict[key].append(qualifier_value)

    for item in claims['results']['bindings']:
        group_key = item['g']['value']

        # Directly use the labels from the item instead of calling get_label
        pLabel = item.get('pLabel', {}).get('value', '') if 'pLabel' in item else ''
        oLabel = item.get('oLabel', {}).get('value', '') if 'oLabel' in item else ''
        p2Label = item.get('p2Label', {}).get('value', '') if 'p2Label' in item else ''
        o2Label = item.get('o2Label', {}).get('value', '') if 'o2Label' in item else ''
        
        qualifier = item.get('qualifier', {}).get('value', '')
        beginning = item.get('beginning', {}).get('value', 'no date available')
        asserted = 'yes' if 'g2' in item else 'no'
        
        # Create the claim key
        claim_key = (item['p']['value'], item['o']['value'])

        if group_key not in grouped_data:
            grouped_data[group_key] = {
                'claim_data': {((item['p']['value'], pLabel), (item['o']['value'], oLabel), tuple(qualifiers_dict.get(claim_key, [])))} ,
                'contextual_metadata': {((item['p2']['value'], p2Label), (item['o2']['value'], o2Label))},
                'asserted': asserted,
                'publication_date': beginning,
                'settled': group_key if settled_claim == group_key else None,
            }
        else:
            grouped_data[group_key]['claim_data'].add(((item['p']['value'], pLabel), (item['o']['value'], oLabel), tuple(qualifiers_dict.get(claim_key, []))))
            grouped_data[group_key]['contextual_metadata'].add(((item['p2']['value'], p2Label), (item['o2']['value'], o2Label)))
            if 'g2' in item:
                grouped_data[group_key]['asserted'] = 'yes'
            if 'beginning' in item:
                grouped_data[group_key]['publication_date'] = beginning

    return grouped_data

# Updated document function to execute the new SPARQL query
@doc_bp.route("/documents/<documentID>", methods=["GET", "POST"])
def document(documentID):

    # gets undisputed data
    undisputed_query = prefixes + f"""
    PREFIX conj: <https://w3id.org/conjectures/> 
    SELECT DISTINCT ?pLabel ?o ?oLabel 
    WHERE {{ 
        doc:{documentID} a fabio:ArchivalDocument. 
        GRAPH ?g {{
            doc:{documentID} ?p ?o
        }} 
        FILTER NOT EXISTS {{?g conj:settles ?g2}} 
        ?p rdfs:label ?pLabel. 
        OPTIONAL{{?o rdfs:label|dct:title ?oLabel.}} 
        FILTER(!isLiteral(?o) || (isLiteral(?o) && lang(?o) = 'en'))
    }}
    """
    undisputed_data = execute_sparql_query(undisputed_query)

    # Citing references
    documenting_sources_query = prefixes + f"""
    SELECT * 
    WHERE {{ 
        ?ref cito:documents doc:{documentID}. 
        ?ref dct:title ?title 
    }}
    """
    documenting_sources = execute_sparql_query(documenting_sources_query)

    # gets all theories about authenticity
    doc_claims_query = prefixes + f"""
    PREFIX conj: <https://w3id.org/conjectures/> 
    SELECT * 
    WHERE {{
        CONJ ?g {{ 
            doc:{documentID} ?p ?o . 
            OPTIONAL {{?o ov:confidence|rico:dateQualifier ?qualifier}} 
            }} 
        ?g ?p2 ?o2  
        OPTIONAL {{?o rdfs:label|rdfs:description|dct:title ?oLabel}}
        OPTIONAL {{?p rdfs:label|rdfs:description|dct:title ?pLabel}}
        OPTIONAL {{?p2 rdfs:label|rdfs:description|dct:title ?p2Label}}
        OPTIONAL {{?o2 rdfs:label|rdfs:description|dct:title ?o2Label}}
        OPTIONAL {{?g2 conj:settles ?g}}
        OPTIONAL {{?g prov:wasQuotedFrom ?ref. ?ref dct:date ?date. ?date time:hasBeginning ?beginning}} 
    }} 
    ORDER BY DESC (?beginning)
    """
    claims = execute_sparql_query(doc_claims_query)

    # gets theories about authenticity
    settled_claim_query = prefixes + f"""
    SELECT DISTINCT ?g
    WHERE {{
        SETT ?g {{ doc:{documentID} ?p ?o . }}
    }} 
    """
    settled_claim = execute_sparql_query(settled_claim_query)
    settled_claim_value = settled_claim['results']['bindings'][0]['g']['value'] if settled_claim['results']['bindings'] else None

    # process and group claim data
    grouped_data = process_claims(claims, settled_claim_value)

    # renders the template
    return render_template("document.html", plot_div='', undisputed_data=undisputed_data, grouped_data=grouped_data, documenting_sources=documenting_sources)
