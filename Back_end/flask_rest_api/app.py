from flask import Flask, jsonify, request
from flask_cors import CORS  # Add this line
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
app = Flask(__name__)
CORS(app)  # Add this line

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:heman2838@localhost/legalManagementSystem'
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
def Create_user():
    return create_user()
    

@app.route('/update/<user_id>', methods=['PUT'])
def Update_User(user_id):
    return update_user(user_id)

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    return delete_user(id)

#### company Branches
@app.route('/company')
def getCompanyRegionView():
    return get_all_Company_Region_View()



# Getting allcases
@app.route('/cases')
def get_all_Cases():
    return get_all_cases()


# client Management
@app.route('/clientManagement')
def all_ClientManagementView():
    return get_all_ClientManagementView()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)