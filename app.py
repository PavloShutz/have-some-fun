from flask import Flask, render_template, request
from flask_jwt_extended import JWTManager, jwt_required
from sqlalchemy.orm import Session

from config import Config
from db import User, engine


app = Flask(__name__)
app.config.from_object(Config)

jwt = JWTManager(app)

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')


@app.route('/register', methods=['POST', 'GET'])
def register():
	if request.method == 'POST':
		data = request.get_json()
		with Session(engine) as session:
			user = User(
				name=data['name'],
				email=data['email'],
				password=data['password']
			)
			session.add(user)
			session.commit()
	return render_template('register.html')

if __name__ == '__main__':
	app.run(debug=True, port=5500)
