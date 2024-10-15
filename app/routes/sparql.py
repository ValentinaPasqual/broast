from flask import Flask
from flask import Blueprint, render_template, send_from_directory, request,  url_for, redirect, session, Response, jsonify
from urllib.parse import parse_qs , quote
from app import endpoint_configuration, set_prefixes

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
sparql_bp = Blueprint('sparql', __name__)

# ENDPOINT
@sparql_bp.route("/sparql", methods=['GET', 'POST'])
def sparql_gui(active=None):
    if request.method == 'GET':
        return render_template('sparql.html', active=active)
    elif request.method == 'POST':
        return process_query()

@sparql_bp.errorhandler(403)
def page_not_found(e):
	# note that we set the 403 status explicitly
	return render_template('403.html'), 403

@sparql_bp.errorhandler(500)
def server_error(e):
	# note that we set the 403 status explicitly
	return render_template('500.html'), 500

@sparql_bp.route('/process_query', methods=['POST'])
def process_query():
    data = request.get_json()
    query = data['string']

    query_result = sparql_api.execute_get_select_query(repository, query=query)

    if 'select' in query.lower() or 'construct' in query.lower():
        if isinstance(query_result, str):
            return render_template('500.html'), 500
        else:
            # If the query result is a JSON response, return it as JSON
            return jsonify(query_result)
    else:
        return render_template('403.html'), 403

if __name__ == "__main__":
    sparql_bp.run(debug = True, port = 8080)