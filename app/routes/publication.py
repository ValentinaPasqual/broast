from flask import Blueprint, render_template
from app import endpoint_configuration, set_prefixes

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
pub_bp = Blueprint('publication', __name__)

# Handles bibliographic entry pages 
@pub_bp.route("/publications/<refID>", methods=["GET", "POST"])
def publication(refID):

    # gets the publications descriptive meta 
    ref_query = prefixes + """
    SELECT DISTINCT ?p ?o ?pLabel ?oLabel 
    WHERE {
        pub:"""+refID+""" ?p ?o . 
        ?p rdfs:label ?pLabel . 
        OPTIONAL { ?o rdfs:label|dct:title ?oLabel } 
        OPTIONAL { FILTER(lang(?oLabel) = 'en') }
        OPTIONAL {pub:"""+refID+""" dct:title ?olabel } 
    }"""
    ref_metadata = sparql_api.execute_get_select_query(repository, query=ref_query)

    # gets all other bibliographic entries about the same archival document 
    suggested_references = []

    suggested_references_query = prefixes + """
    SELECT DISTINCT ?ref ?description (COUNT(?doc) as ?n)
    WHERE { 
        pub:"""+refID+""" cito:documents ?doc .  
        ?ref cito:documents ?doc ;
            dct:description ?description . 
        
        FILTER NOT EXISTS {
            ?ref a fabio:ArchivalDocument 
        }
        FILTER (?ref != pub:"""+refID+""")
    }
    GROUP BY ?ref ?description ORDER BY DESC (?n)
    """
    suggested_references = sparql_api.execute_get_select_query(repository, query=suggested_references_query)

    print(suggested_references)
    # renders the template
    return render_template("publication.html", ref_metadata=ref_metadata, suggested_references=suggested_references)