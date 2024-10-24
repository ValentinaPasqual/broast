from flask import Blueprint, render_template

ko_bp = Blueprint('knowledge_organisation', __name__)

@ko_bp.route("/knowledge_organisation", methods=["GET", "POST"])
def knowledge_organisation():
    return render_template("documentation.html")