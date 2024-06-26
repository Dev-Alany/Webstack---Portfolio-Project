from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash
from UserManagment import Users, db
from clientManagement import Client
from CasseManagement import Cases, CaseCategory, SubCategory
from CompanyManagment import Company, IndustrySector
from AccountManagement import Banks, BankAccounts, BankBranches
from query import get_all_Users, get_all_Company_Region_View, get_all_cases, get_all_ClientManagementView
from delete import delete_user
from companyRegionBranches import CompanyRegionBranchView
from mutation import create_user
from update import update_user
from signin import SignIn
from flask_login import LoginManager, login_required, current_user

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://bethwel:kk@localhost/BETH'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
db.init_app(app)

@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'

@app.route('/login', methods=['POST'])
def login():
    return SignIn()

@app.route('/user')
@login_required
def get_user_data():
    user_data = {
        "username": current_user.username,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "status": current_user.status
    }
    return jsonify(user_data)

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
def Create_user():
    return create_user()
    

@app.route('/update/<user_id>', methods=['PUT'])
def Update_User(user_id):
    return update_user(user_id)

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    return delete_user(id)

@app.route('/company')
def getCompanyRegionView():
    return get_all_Company_Region_View()

@app.route('/cases')
def get_all_Cases():
    return get_all_cases()

@app.route('/clientManagement')
def all_ClientManagementView():
    return get_all_cases()
    # return get_all_ClientManagementView()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)