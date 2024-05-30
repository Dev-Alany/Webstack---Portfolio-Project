from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Add this line
from sqlalchemy import text
from UserManagment import Users, db
from clientManagement import Client
from CasseManagement import Cases, CaseCategory, SubCategory
from CompanyManagment import Company
from AccountManagement import Banks, BankAccounts, BankBranches
from query import get_all_Users
from delete import delete_user

app = Flask(__name__)
CORS(app)  # Add this line

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://bethwel:KK@localhost/BETH'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'

@app.route('/crb', methods=['GET'])
def get_company_region_branches():
    return get_all_Users()

@app.route('/data')
def getdata():
    return get_all_Users()

@app.route('/data/<id>')
def get_data_by_id(id):
    user = Users.query.get_or_404(id)
    return {'First_name': user.First_name, 'Last_name': user.Last_name, 'User_email': user.User_Email}

@app.route('/data', methods=['POST'])
def create_user():
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    User_Email = data.get('email')
    Phone_number = data.get('phone')

    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = Users(First_name=First_name, Last_name=Last_name, User_Email=User_Email, Phone_number=Phone_number)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    return delete_user(id)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)