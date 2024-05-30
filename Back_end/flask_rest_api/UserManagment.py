from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = "Users"
    User_Id = db.Column(db.Integer, primary_key=True)
    Username = db.Column(db.String(256), nullable=True)
    First_name = db.Column(db.String(256), nullable=True)
    Last_name = db.Column(db.String(256), nullable=True)
    User_Email = db.Column(db.String(256), nullable=True)
    Phone_number = db.Column(db.String(256), nullable=True)
    Status = db.Column(db.String(50), default="Active")

    def __repr__(self):
        return f'{self.First_name}'

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

def update_user(user_id):
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    User_Email = data.get('email')
    Phone_number = data.get('phone')

    # Check if all required parameters are present
    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Query the user by ID
    user = Users.query.get_or_404(user_id)

    # Update user attributes
    user.First_name = First_name
    user.Last_name = Last_name
    user.User_Email = User_Email
    user.Phone_number = Phone_number

    try:
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500