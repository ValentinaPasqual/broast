from flask import Blueprint, render_template
from app import endpoint_configuration, set_prefixes

repository, sparql_api = endpoint_configuration()
prefixes = set_prefixes()
pubs_bp = Blueprint('publications', __name__)

# VISUALISATIONS
@pubs_bp.route('/publications/')
def publications():

    # gets all publications
    publications_query = prefixes + """
    SELECT DISTINCT ?ref ?title ?classLabel
    WHERE {  
        VALUES (?class) { (fabio:Book) (fabio:BookChapter) (fabio:Article) (fabio:ArchivalRecordSet) (fabio:Anthology)} 
        ?ref a ?class; 
            dct:title ?title.
        ?class rdfs:label ?classLabel
    }
    ORDER BY ASC (?classLabel) ASC (?title)
    """
    publications = sparql_api.execute_get_select_query(repository, query=publications_query)

    # renders the template
    return render_template('publications.html', publications = publications)
