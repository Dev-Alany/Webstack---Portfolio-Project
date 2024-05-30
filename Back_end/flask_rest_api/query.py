from UserManagment import Users, db
from companyRegionBranches import CompanyRegionBranchView
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

def get_all_Users():
        user = Users.query.all()
        output = []
        for u in user:
                user_data = {
                        'User_Id':u.User_Id,
                        'First_name': u.First_name,
                        'Last_name': u.Last_name,
                        'User_email': u.User_Email,
                        'Phone_number':u.Phone_number,
                        'status':u.Status
                }
                output.append(user_data)
        return {"data": output}

def get_all_Company_Region_View():
        user = CompanyRegionBranchView.query.all()
        output = []
        for u in user:
                user_data = {
                        'id':u.Id,
                        'CompanyName':u.CompanyName,
                        'BranchName': u.BranchName,
                        # 'Last_name': u.Last_name,
                        # 'User_email': u.User_Email,
                        # 'Phone_number':u.Phone_number,
                        # 'status':u.Status
                }

                output.append(user_data)
        return {"data": output}

def get_all_cases():
        sql=text('select * from ClientCaseDetailsView;')
        allcases=db.session.execute(sql)
        output = []
        for u in allcases:
                Cases_data = {
                        'id':u.Id,
                        # 'CompanyName':u.CompanyName,
                        'SubCategoryName': u.SubCategoryName,
                        'Client_Type': u.Client_Type,
                        'CaseName': u.CaseName,
                        'CaseCategory':u.CaseCategory,
                        # 'status':u.Status
                }

                output.append(Cases_data)
        return {"data": output}