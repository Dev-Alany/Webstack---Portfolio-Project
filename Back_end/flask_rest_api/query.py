from UserManagment import Users 
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