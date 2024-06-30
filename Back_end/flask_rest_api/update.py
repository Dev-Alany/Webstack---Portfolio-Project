from UserManagment import db, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

def update_user(user_id):
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    Username = data.get('Username')
    User_Email = data.get('email')
    Phone_number = data.get('phone')
    genderId = data.get('gender')
    updated_by = data.get('updated_by')
    updated_at = data.get('updated_at')


    #  ***  Handling Username
    Kainat = text('select Username from users;')
    userName = db.session.execute(Kainat)

    if Username == userName:
        return jsonify({'error':f'{Username} already exists'}), 500
    # Check if all required parameters are present
    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Construct SQL update statement with placeholders
    genderId = data.get('gender')
    upuser = text("UPDATE users SET First_name=:first_name, Last_name=:last_name, Phone_number=:phone_number, User_Email=:User_Email, updated_by=:updated_by,  updated_at=:updated_at, Username=:Username, genderId=:genderId WHERE User_Id=:user_id")

    try:
        # Execute the SQL statement with parameters
        db.session.execute(upuser, {'first_name': First_name, 'last_name': Last_name, 'phone_number': Phone_number, 'User_Email':User_Email ,'user_id': user_id, 'updated_by':updated_by,  'updated_at':updated_at, 'Username':Username, 'genderId':genderId})
        db.session.commit()
        return jsonify({'message': f'{Username} updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

def update_caes(case_id):
    data = request.get_json()
    Name = data.get('Name')

    # Check if all required parameters are present
    if not Name:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Construct SQL update statement with placeholders
    UpdateCases = text("UPDATE cases SET Name=:Name WHERE Id=:case_id")

    try:
        # Execute the SQL statement with parameters
        db.session.execute(UpdateCases, {'Name': Name, "case_id":case_id})
        db.session.commit()
        return jsonify({'message': f'{Name}  Case updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500