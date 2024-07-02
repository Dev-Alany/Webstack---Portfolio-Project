from flask import jsonify, request
from UserManagment import db, Users
from CasseManagement import Cases
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from clientManagement import IndividualClients, CorporateClients

def create_user():
    data = request.get_json()
    Username = data.get('Username')
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    User_Email = data.get('email')
    Phone_number = data.get('phone')
    created_by = data.get('created_by')
    created_at = data.get('created_at')
    genderId = data.get('gender')


    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = Users(Username=Username, First_name=First_name, Last_name=Last_name, User_Email=User_Email, Phone_number=Phone_number, created_by= created_by, created_at=created_at, genderId=genderId, Status=1)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': f'{First_name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500  
    
def Create_Case():
    data = request.get_json()
    Name = data.get('Name')
    # Last_name = data.get('last_name')
    # User_Email = data.get('email')
    # Phone_number = data.get('phone')

    if not Name: 
        return jsonify({'error': 'Missing required parameters'}), 400

    Case = Cases(Name=Name)
    
    try:
        db.session.add(Case)
        db.session.commit()
        return jsonify({'message': f'{Name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500 
    
#  *** Client Management ***

def create_IndividualClient():
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone')
    created_by = data.get('created_by')
    created_at = data.get('created_at')
    genderId = data.get('gender')


    if not First_name or not Last_name or not email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = IndividualClients(First_name=First_name, Last_name=Last_name, email=email, phone_number=phone_number, created_by= created_by, created_at=created_at, genderId=genderId)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': f'{First_name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500  


def create_CorporateClient():
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone')
    created_by = data.get('created_by')
    created_at = data.get('created_at')


    if not First_name or not Last_name or not email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = CorporateClients(First_name=First_name, Last_name=Last_name, email=email, phone_number=phone_number, created_by= created_by, created_at=created_at, genderId=genderId)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': f'{First_name} created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500  