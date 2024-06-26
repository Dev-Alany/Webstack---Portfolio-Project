from UserManagment import db, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

def update_user(user_id):
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    User_Email = data.get('email')
    Phone_number = data.get('phone')

    # Check if all required parameters are present
    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Construct SQL update statement with placeholders
    upuser = text("UPDATE Users SET First_name=:first_name, Last_name=:last_name, Phone_number=:phone_number, User_Email=:User_Email WHERE User_Id=:user_id")

    try:
        # Execute the SQL statement with parameters
        db.session.execute(upuser, {'first_name': First_name, 'last_name': Last_name, 'phone_number': Phone_number, 'User_Email':User_Email ,'user_id': user_id})
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500