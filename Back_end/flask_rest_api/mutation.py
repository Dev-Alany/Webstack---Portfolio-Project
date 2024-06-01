from flask import jsonify, request
from UserManagment import db, Users
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

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
        return jsonify({'message': '{First_name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

