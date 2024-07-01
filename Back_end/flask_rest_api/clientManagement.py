from UserManagment import db, SQLAlchemy
from sqlalchemy import func, Column, Integer, Sequence
from datetime import datetime

class Client(db.Model):
        __tablename__="Clients"
        Id= db.Column(db.Integer, primary_key=True)
        Name=db.Column(db.String(256), nullable=True)
        Client_Type=db.Column(db.String(256), nullable=True)
        company_id = db.Column(db.Integer, db.ForeignKey('Company.Id'), nullable=False)

        Company = db.relationship("Company", back_populates="Client")
        # Case_Id=db.Column(db.Integer, primary_key=True)

class IndividualClients(db.Model):
    __tablename__ = "Individualclients"
    id = Column(Integer, Sequence('individual_client_id_seq', start=1, increment=1), primary_key=True)
    First_name = db.Column(db.String(256), nullable=True)
    Last_name = db.Column(db.String(256), nullable=True)
    email = db.Column(db.String(256), nullable=True)
    phone_number = db.Column(db.String(256), nullable=True)
    Status = db.Column(db.String(50), default=1)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())
    created_by = db.Column(db.String(50), nullable=False)
    updated_by = db.Column(db.String(50), nullable=True)
    genderId= db.Column(db.Integer, nullable=True)