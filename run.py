from app import *

app = create_app()

@app.errorhandler(403)
def page_not_found(e):
	# note that we set the 403 status explicitly
	return render_template('403.html'), 403

@app.errorhandler(404)
def page_not_found(e):
	# note that we set the 404 status explicitly
	return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
	# note that we set the 403 status explicitly
	return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, port = 8080)