# app/routes/main.py
from flask import Blueprint, render_template
from app import endpoint_configuration, set_prefixes
import json
import os

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
main_bp = Blueprint('main', __name__)

# Handles the index route
@main_bp.route("/", methods=["GET", "POST"])
def index():

    # gets the Competency questions' queries (Collection insights) from JSON file
    queries_path = os.path.abspath('app/graphDB/queries/insights_query.json')

    # gets the queries to retrieve some numbers about the collection from JSON file
    quick_queries_path = os.path.abspath('app/graphDB/queries/quick_insights_query.json')

    # Runs the queries to retieve numbers on the collection
    with open(quick_queries_path, 'r') as file:
        quick_queries = json.load(file)

    for quick_query_data in quick_queries:
        quick_query = prefixes + quick_query_data['query']
        try:
            quick_query_result = sparql_api.execute_get_select_query(repository, query=quick_query)
            quick_query_data.update({'results':quick_query_result['results']['bindings']})
        except:
            quick_query_data.update({'results':'Error'})
        
    # Runs queries in insight section (competency questions)
    with open(queries_path, 'r') as file:
        queries = json.load(file)
    
    for query_data in queries:
        query = prefixes + query_data['query']
        query_result = sparql_api.execute_get_select_query(repository, query=query)
        query_data.update({'results':query_result['results']['bindings']})

    # Renders the template
    return render_template("index.html", quick_queries=quick_queries, queries=queries)