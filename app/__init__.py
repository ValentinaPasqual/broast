# app/__init__.py

# Flask imports
from flask import Flask
from flask import Flask
from flask import Blueprint, render_template, send_from_directory, request,  url_for, redirect, session, Response, jsonify

# Triplestore manager imports
from graphdb.rdf4j.api.repositories_api import RepositoriesApi
from graphdb.rdf4j.api.sparql_api import SparqlApi
from graphdb.rdf4j.configuration import Configuration
from graphdb.rdf4j.api_client import ApiClient
#from graphdb.mime_types import RDFTypes

# Other libraries import to handle folders and requests
import urllib
import os
import requests

def endpoint_configuration():
    conf = Configuration()
    conf.host = "http://localhost:7200/"
    api_client = ApiClient(configuration=conf)
    api_client.set_default_header("Content-Type", "application/x-www-form-urlencoded")
    repository = "forgont_endpoint"
    api = RepositoriesApi(api_client)
    sparql_api = SparqlApi(api_client)

    return repository, sparql_api

def set_prefixes():
    prefixes = """
    prefix dct: <http://purl.org/dc/terms/>
    prefix forgont: <http://www.example.org/>
    prefix owl: <http://www.w3.org/2002/07/owl#>
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prefix viaf: <https://viaf.org/viaf/>
    prefix wd: <http://www.wikidata.org/entity/>
    prefix xsd: <http://www.w3.org/2001/XMLSchema#>
    prefix schema:<http://schema.org/>
    prefix kb: <http://www.example.org/forgont/kb/>
    prefix prov: <http://www.w3.org/ns/prov#>
    prefix time: <https://www.w3.org/TR/owl-time/>
    PREFIX sebi: <https://w3id.org/sebi/>
    PREFIX cito: <http://purl.org/spar/cito/>
    PREFIX fabio: <http://purl.org/spar/fabio/>
    prefix doc: <https://w3id.org/broast/urk/documents/> 
    prefix people: <https://w3id.org/broast/urk/scholars/> 
    prefix pub: <https://w3id.org/broast/urk/publications/> 
    PREFIX ov: <http://open.vocab.org/terms/>
    PREFIX rico: <https://www.ica.org/standards/RiC/ontology#>
    """
    return prefixes

def create_app():

    app = Flask(__name__, static_folder="assets")

    app.secret_key = 'V4LELOV3SFORGERIES'
    app.config['SESSION_TYPE'] = 'filesystem'

    sparql_api = endpoint_configuration()

    # Register blueprints (routes)
    from .routes.main import main_bp
    from .routes.publication import pub_bp
    from .routes.documents import docs_bp
    from .routes.document import doc_bp
    from .routes.scholar import schol_bp
    from .routes.scholars import schols_bp
    from .routes.publications import pubs_bp
    from .routes.sparql import sparql_bp
    from .routes.insights import viz_bp


    app.register_blueprint(main_bp)
    app.register_blueprint(pub_bp)
    app.register_blueprint(docs_bp)
    app.register_blueprint(doc_bp)
    app.register_blueprint(schol_bp)
    app.register_blueprint(schols_bp)
    app.register_blueprint(pubs_bp)
    app.register_blueprint(sparql_bp)
    app.register_blueprint(viz_bp)

    return app



