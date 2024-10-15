# app/routes/documents.py - the scholar page 

from flask import Blueprint, render_template
from app import endpoint_configuration, set_prefixes
import requests

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
schol_bp = Blueprint('scholar', __name__)


# Function to get label from Wikidata entities
def get_wikidata_label(wikidata_id):
    wikidata_endpoint = "https://www.wikidata.org/w/api.php"

    params = {
        "action": "wbgetentities",
        "format": "json",
        "ids": wikidata_id,
        "props": "labels"
    }

    response = requests.get(wikidata_endpoint, params=params)
    data = response.json()["entities"]

    label = data.get(wikidata_id, {}).get("labels", {}).get("en", {}).get("value", "Label not found")

    return label

# Funtion to get biographical information about the scholar
def get_author_info(wikidata_id):
    wikidata_endpoint = "https://www.wikidata.org/w/api.php"

    params = {
        "action": "wbgetentities",
        "format": "json",
        "ids": wikidata_id,
        "props": "claims"
    }

    response = requests.get(wikidata_endpoint, params=params)
    data = response.json()["entities"]

    scholar_info = {}

    for wikidata_id in data:
        entity = data[wikidata_id]

        if "P18" in entity["claims"]:
            image_url = entity["claims"]["P18"][0]["mainsnak"]["datavalue"]["value"]
            scholar_info.update({'image':'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/'+image_url})

        if "P106" in entity["claims"]:
            occupation = [(claim["mainsnak"]["datavalue"]["value"]["id"], get_wikidata_label(claim["mainsnak"]["datavalue"]["value"]["id"])) for claim in entity["claims"]["P106"]]
            scholar_info.update({'Occupation':occupation})

        if "P569" in entity["claims"]:
            date_of_birth = entity["claims"]["P569"][0]["mainsnak"]["datavalue"]["value"]["time"]
            scholar_info.update({'Date of birth':date_of_birth})

        if "P19" in entity["claims"]:
            place_of_birth = (entity["claims"]["P19"][0]["mainsnak"]["datavalue"]["value"]["id"], get_wikidata_label(entity["claims"]["P19"][0]["mainsnak"]["datavalue"]["value"]["id"]))
            scholar_info.update({'Place of Birth':place_of_birth})
        
        if "P570" in entity["claims"]:
            date_of_death = entity["claims"]["P570"][0]["mainsnak"]["datavalue"]["value"]["time"]
            scholar_info.update({'Date of death':date_of_death})

        if "P20" in entity["claims"]:
            place_of_death = (entity["claims"]["P20"][0]["mainsnak"]["datavalue"]["value"]["id"], get_wikidata_label(entity["claims"]["P20"][0]["mainsnak"]["datavalue"]["value"]["id"]))
            scholar_info.update({'Place of death':place_of_death})

    return scholar_info

@schol_bp.route("/scholars/<scholarID>", methods=["GET", "POST"])
def scholar(scholarID):

    # gets the scholar name
    scholar_name_query = prefixes + """
    SELECT ?label WHERE {   
        people:"""+scholarID+""" rdfs:label ?label 
    }"""
    scholar_name_data = sparql_api.execute_get_select_query(repository, query=scholar_name_query)
    scholar_name = scholar_name_data['results']['bindings'][0]['label']['value']

    # gets the publications of the scholar
    scholar_works_query = prefixes + """
    SELECT DISTINCT ?ref ?propertyLabel ?classLabel ?reference_text
    WHERE {  
        VALUES (?property) { (dct:creator) (dct:contributor) (dct:publisher)  } 
        ?ref a ?class; 
            ?property people:"""+scholarID+""" ;
            dct:description ?reference_text. 
        ?property rdfs:label ?propertyLabel.
        ?class rdfs:label ?classLabel . 
        FILTER(?class != fabio:ArchivalDocument)
    }
    """
    scholar_works = sparql_api.execute_get_select_query(repository, query=scholar_works_query)

    related_elements = {}

    # gets the related documents
    related_scholars = prefixes + """
    SELECT DISTINCT ?item ?itemLabel (COUNT(DISTINCT ?item) AS ?commonDocCount)
    WHERE { 
        VALUES (?property) { (dct:creator) (dct:contributor) (dct:publisher) } 
        ?reference ?property people:"""+scholarID+""" ;
            cito:documents ?archival_document.
        ?reference2 cito:documents ?archival_document;
            ?property ?item.
        ?item rdfs:label ?itemLabel . 
        FILTER (?item != people:"""+scholarID+""")
    } 	
    GROUP BY ?item ?itemLabel ORDER BY DESC (?commonDocCount)
    """
    related_scholars = sparql_api.execute_get_select_query(repository, query=related_scholars)

    # gets the related scholars 
    related_docs_query = prefixes + """
    SELECT DISTINCT ?item ?itemLabel
    WHERE { 
        VALUES (?property) { (dct:creator) (dct:contributor) (dct:publisher) } 
        ?reference ?property people:"""+scholarID+""" ;
            cito:documents ?item.
        ?item dct:title ?itemLabel
    } 	
    """
    related_docs = sparql_api.execute_get_select_query(repository, query=related_docs_query)

    # add the results of a common dict with all lists of related elements
    related_elements.update({'Related scholars':related_scholars})
    related_elements.update({'Related documents':related_docs})

    # gets scholar info from Wikidata
    scholar_wiki_query = prefixes + """SELECT ?wiki WHERE {people:"""+scholarID+""" owl:sameAs ?wiki }"""
    scholar_wiki = sparql_api.execute_get_select_query(repository, query=scholar_wiki_query)

    # wheter or not biographic data are available in Wikidata, it renders the template
    if len(scholar_wiki['results']['bindings']) > 0:
        wiki_id = scholar_wiki['results']['bindings'][0]['wiki']['value'].replace('http://www.wikidata.org/entity/', '')
        
        # gets the biographical info from Wikidata
        wikidata_info = get_author_info(wiki_id)

        return render_template("scholar.html", scholar_name=scholar_name, scholar_works=scholar_works, related_elements=related_elements, wikidata_info=wikidata_info)
   
    else:
        return render_template("scholar.html", scholar_name=scholar_name, scholar_works=scholar_works, related_elements=related_elements, wikidata_info='')