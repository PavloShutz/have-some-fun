from flask import Flask, render_template, request

app = Flask(__name__)

app.secret_key = 'secret'

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')


if __name__ == '__main__':
	app.run(debug=True, port=5500)
