from UserManagment import db

class Cases(db.Model):
    __tablename__ = "Cases"
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(256), nullable=False)
    case_category_Id = db.Column(db.Integer, db.ForeignKey('CaseCategory.Id'), nullable=False)
    case_subcategory_Id = db.Column(db.Integer, db.ForeignKey('SubCategory.Id'), nullable=False)

    category = db.relationship("CaseCategory", back_populates="cases")
    subcategory = db.relationship("SubCategory", back_populates="cases")


class CaseCategory(db.Model):
    __tablename__ = "CaseCategory"
    Id = db.Column(db.Integer, primary_key=True)
    Category = db.Column(db.String(256), nullable=True)

    cases = db.relationship("Cases", back_populates="category")


class SubCategory(db.Model):
    __tablename__ = "SubCategory"
    Id = db.Column(db.Integer, primary_key=True)
    Category = db.Column(db.String(256), nullable=True)

    cases = db.relationship("Cases", back_populates="subcategory")

