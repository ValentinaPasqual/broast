from flask import Flask
from flask import Blueprint, render_template, send_from_directory, request,  url_for, redirect, session, Response, jsonify
from urllib.parse import parse_qs , quote
from app import endpoint_configuration, set_prefixes
import json
import os

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
viz_bp = Blueprint('insights', __name__)

def extract_lat_lng(point):
    point = point.lower().replace('point', '').replace(')', '').replace('(', '').strip()
    coords = point.split(' ')
    lng = float(coords[0].strip())
    lat = float(coords[1].strip())
    return lat, lng

# Endpoint for map markers data
@viz_bp.route('/map-data')
def map_data():

    map_query = prefixes + f"""
    SELECT ?point ?label ?s ?title
    WHERE {{ 
        CONJ ?g {{?s dct:coverage ?place}}
        ?place forgont:hasLatitude ?point ;
            rdfs:label ?label . 
        ?s dct:title ?title
    }}
    """
    map_result = sparql_api.execute_get_select_query(repository, query=map_query)

    # Convert to markers format
    markers = []
    for binding in map_result['results']['bindings']:
        point_value = binding['point']['value']
        lat, lng = extract_lat_lng(point_value)
        markers.append({'lat': lat, 'lng': lng})

    return jsonify(markers)

# Endpoint for line chart data
@viz_bp.route('/chart-data')
def chart_data():

    sett_timechart_query = prefixes + f"""
    SELECT ?label (COUNT(?date) AS ?n)
    WHERE {{
        SETT ?g {{?s dct:date ?date ; a forgont:Forgery .}}
        ?date a time:Interval ;
        time:hasBeginning ?start ;
        time:hasEnd ?end . 
        BIND(YEAR(?start) AS ?startYear)
        BIND(FLOOR(?startYear / 100) * 100 AS ?centuryStart)
        BIND(?centuryStart AS ?label)
    }}
    GROUP BY ?label
    ORDER BY ?label
    """ 
    sett_timechart_result = sparql_api.execute_get_select_query(repository, query=sett_timechart_query)

    alleged_timechart_query = prefixes + f"""
    SELECT ?label (COUNT(?date) AS ?n)
    WHERE {{
        CONJ ?g {{?s dct:date ?date ; a forgont:Authentic .}}
        ?date a time:Interval ;
        time:hasBeginning ?start ;
        time:hasEnd ?end .
        BIND(YEAR(?start) AS ?startYear)
        BIND(FLOOR(?startYear / 100) * 100 AS ?centuryStart)
        BIND(?centuryStart AS ?label)
    }}
    GROUP BY ?label
    ORDER BY ?label
    """ 
    alleged_timechart_result = sparql_api.execute_get_select_query(repository, query=alleged_timechart_query)

    # Initialize chart_data structure
    chart_data = {
        'labels': ['400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400'],
        'datasets': [
            {'label': 'Settled (Forgery)', 'data': [0] * len(['400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400']), 'borderColor': 'rgba(75, 192, 192, 1)', 'fill': False},
            {'label': 'Alleged (Authentic)', 'data': [0] * len(['400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400']), 'borderColor': 'rgba(153, 102, 255, 1)', 'fill': False},
        ]
    }

    # Extract data from the results for the first dataset
    for binding in sett_timechart_result['results']['bindings']:
        n_value = int(binding['n']['value'])  # Convert 'n' value to integer
        label = binding['label']['value']
        
        if label in chart_data['labels']:
            index = chart_data['labels'].index(label)
            chart_data['datasets'][0]['data'][index] = n_value

    # Extract data from the results for the second dataset
    for binding in alleged_timechart_result['results']['bindings']:
        n_value = int(binding['n']['value'])  # Convert 'n' value to integer
        label = binding['label']['value']
        
        if label in chart_data['labels']:
            index = chart_data['labels'].index(label)
            chart_data['datasets'][1]['data'][index] = n_value

    # Normalize the datasets
    for dataset in chart_data['datasets']:
        total = sum(dataset['data'])
        if total > 0:  # Avoid division by zero
            dataset['data'] = [round((value / total) * 100, 2) for value in dataset['data']]

        return jsonify(chart_data)

# Endpoint for scholar network data
#@viz_bp.route('/scholar-network')
#def scholar_network():
    # SPARQL query to get scholars and their connections
    network_query = prefixes + """
    SELECT DISTINCT ?doc ?scholar ?scholarLabel
    WHERE {
        CONJ ?g {?doc ?p ?o}
        ?g prov:wasQuotedFrom ?ref.
        ?ref dct:creator|dct:contributor|dct:publisher ?scholar.
        ?scholar rdfs:label ?scholarLabel
    }
    """

    network_result = sparql_api.execute_get_select_query(repository, query=network_query)

       # Prepare nodes and edges for the network
    nodes = []
    edges = []
    scholar_map = {}
    doc_scholar_map = {}
    edge_weights = {}  # Dictionary to track edge weights

    # Create unique nodes and map documents to scholars
    for binding in network_result['results']['bindings']:
        doc = binding['doc']['value']
        scholar = binding['scholar']['value']
        scholar_label = binding['scholarLabel']['value']

        # Add scholar node if not already present
        if scholar not in scholar_map:
            nodes.append({'id': scholar, 'label': scholar_label})
            scholar_map[scholar] = scholar_label

        # Map documents to scholars
        if doc not in doc_scholar_map:
            doc_scholar_map[doc] = []
        doc_scholar_map[doc].append(scholar)

    # Create edges between scholars who share the same document
    for scholars in doc_scholar_map.values():
        if len(scholars) > 1:  # Only link if there are multiple scholars for the document
            for i in range(len(scholars)):
                for j in range(i + 1, len(scholars)):
                    # Create a sorted tuple to represent an undirected edge
                    edge = (scholars[i], scholars[j])
                    
                    # Initialize or increment the edge weight
                    if edge not in edge_weights:
                        edge_weights[edge] = 0
                    edge_weights[edge] += 1

    # Construct edges with weights from the edge_weights dictionary
    for (scholar1, scholar2), weight in edge_weights.items():
        edges.append({'from': scholar1, 'to': scholar2, 'weight': weight})

    # Return the network data as JSON
    return jsonify({'nodes': nodes, 'edges': edges})

@viz_bp.route('/date-visualization')
def date_visualization():
    # SPARQL query to get the data
    date_query = prefixes + """
    PREFIX conj: <https://w3id.org/conjectures/>
    SELECT DISTINCT ?doc ?date ?g2
    WHERE {
        CONJ ?g {?doc ?p ?o}
        ?g prov:wasQuotedFrom ?ref.
        ?ref dct:date ?time.
        ?time time:hasBeginning ?date.
        OPTIONAL {?g2 conj:settles ?g}
        ?doc a fabio:ArchivalDocument.
        FILTER NOT EXISTS {?ref a fabio:ArchivalDocument.}
        FILTER (?ref != pub:Urkundenverzeichnis)
    }
    """

    date_result = sparql_api.execute_get_select_query(repository, query=date_query)

    # Prepare the data for visualization
    data_points = []
    for binding in date_result['results']['bindings']:
        doc = binding['doc']['value'] 
        date = binding['date']['value']
        g2_present = 'g2' in binding  # Simplified check for the existence of 'g2'

        # Extract the index number from the document string
        # Assuming the doc string contains backslashes, and the last segment is the index
        index_number = doc.split("/")[-1]  # Split on "\" and take the last element

        # Add the data point with the parsed index number
        data_points.append({
            'doc': index_number,  # Use the extracted index number
            'date': date,
            'g2_present': g2_present
        })
    
    # Sort the data points by the 'doc' key (the index number)
    sorted_data_points = sorted(data_points, key=lambda x: int(x['doc']))

    return jsonify(sorted_data_points)


@viz_bp.route('/insights')
def insights():

    # gets the Competency questions' queries (Collection insights) from JSON file
    queries_path = os.path.abspath('app/graphDB/queries/insights_query.json')

    # Runs queries in insight section (competency questions)
    with open(queries_path, 'r') as file:
        queries = json.load(file)
    
    for query_data in queries:
        query = prefixes + query_data['query']
        query_result = sparql_api.execute_get_select_query(repository, query=query)
        query_data.update({'results':query_result['results']['bindings']})

    return render_template('insights.html', queries=queries)
