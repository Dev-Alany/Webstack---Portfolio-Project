
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from UserManagment import db

# app.config['SQLALCHEMY_DATABASE_URI'] = (
#     'mssql+pyodbc://appollo:@mcbw3c0d3@d@y@38.242.252.117:1418/sheriapro?driver=ODBC+Driver+17+for+SQL+Server'
# )
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



class CompanyRegionBranchView(db.Model):
    __tablename__ = 'CompanyRegionBranchView'
    RegionName = db.Column(db.String(256), nullable=True)
    Id = db.Column(db.Integer, primary_key=True)
    CompanyName = db.Column(db.String(256), nullable=True)
    BranchName = db.Column(db.String(256), nullable=True)

# class Drinks(db.Model):
#     id=db.Column(db.Integer, primary_key=True)
#     name=db.Column(db.String(80), unique=True, nullable=False)
#     describe=db.Column(db.String(80), nullable=True)


def create_CompanyRegionBranchView():
    data = request.get_json()
    RegionName = data.get('RegionName')
    CompanyName = data.get('CompanyName')
    BranchName = data.get('BranchName')
    # Phone_number = data.get('phone')

    if not RegionName or not CompanyName or not BranchName:
        return jsonify({'error': 'Missing required parameters'}), 400

    company = CompanyRegionBranchView(RegionName=RegionName, CompanyName=CompanyName, BranchName=BranchName)
    
    try:
        db.session.add(company)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

def update_companyRegion(id):
    data = request.get_json()
    RegionName = data.get('RegionName')
    CompanyName = data.get('CompanyName')
    BranchName = data.get('BranchName')
    # Phone_number = data.get('phone')

    # Check if all required parameters are present
    if not RegionName or not CompanyName or not BranchName:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Query the user by ID
    user = CompanyRegionBranchView.query.get_or_404(id)

    # Update user attributes
    user.RegionName = RegionName
    user.CompanyName = CompanyName
    user.BranchName = BranchName
    # user.Phone_number = Phone_number

    try:
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500