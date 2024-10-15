# app/routes/documents.py - the scholar page 

from flask import Blueprint, render_template
from app import endpoint_configuration, set_prefixes
import requests

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
schols_bp = Blueprint('scholars', __name__)

# Handles the route for scholars (index)
@schols_bp.route("/scholars/", methods=["GET", "POST"])
def scholars():

    result = []

    # gets all scholars 
    scholars_list_query = prefixes + """
    SELECT DISTINCT ?scholar ?label (COUNT(distinct ?ref) as ?refCount) (COUNT(distinct ?document) as ?docsCount)
    WHERE { 
        VALUES (?property) { (dct:creator) (dct:contributor) (dct:publisher)  } 
        ?ref ?property ?scholar ;
             cito:documents ?document . 
        ?scholar rdfs:label ?label .
        FILTER NOT EXISTS {?ref a fabio:ArchivalDocument}
    } 
    GROUP BY ?scholar ?label ORDER BY ASC (?label)
    """
    scholars = sparql_api.execute_get_select_query(repository, query=scholars_list_query)

    # renders the template
    return render_template("scholars.html", scholars=scholars)
