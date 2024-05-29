
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = (
#     'mssql+pyodbc://appollo:@mcbw3c0d3@d@y@38.242.252.117:1418/sheriapro?driver=ODBC+Driver+17+for+SQL+Server'
# )
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class CompanyRegionBranchView(db.Model):
    __tablename__ = 'CompanyRegionBranchView'
    RegionName = db.Column(db.String, primary_key=True)
    Id = db.Column(db.Integer, primary_key=True)
    CompanyName = db.Column(db.String)
    BranchName = db.Column(db.String)

class Drinks(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(80), unique=True, nullable=False)
    describe=db.Column(db.String(80), nullable=True)