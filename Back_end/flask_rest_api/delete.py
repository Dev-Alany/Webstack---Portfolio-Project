from UserManagment import Users, db
from flask import jsonify
def delete_user(id):    
        user = Users.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": "Successfully Deleted"})