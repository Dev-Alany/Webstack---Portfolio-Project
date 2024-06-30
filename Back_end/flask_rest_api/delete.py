from UserManagment import Users, db, SQLAlchemy, request
from sqlalchemy import text
from flask import jsonify
def delete_user(id):
        query =text("UPDATE users set status = 0 where User_Id =:id")  
        # user = Users.session.query(query)
        db.session.execute(query, {'id':id})
        db.session.commit()
        return jsonify({"success": "Successfully Deleted"})