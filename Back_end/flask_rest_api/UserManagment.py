from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify
from datetime import datetime
from sqlalchemy import func

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
    password = db.Column(db.String(256), nullable=False)   
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())
    created_by = db.Column(db.String(50), nullable=False)
    updated_by = db.Column(db.String(50), nullable=True)
    genderId= db.Column(db.Integer, nullable=True)
    
    def __repr__(self):
        return f'{self.First_name}'

