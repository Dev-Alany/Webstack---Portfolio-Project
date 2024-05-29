from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text, create_engine, URL

app = Flask(__name__)



# Configure the SQLAlchemy part of the app instance to use the engine
# app.config['SQLALCHEMY_DATABASE_URI'] = engine
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mysql+pymysql://bethwel:KK@localhost/BETH'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Create the SQLAlchemy db instance
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'

class Users(db.Model):
    __tablename__="Users"
    User_Id= db.Column(db.Integer, primary_key=True)
    First_name=db.Column(db.String(256), nullable=False)
    Last_name=db.Column(db.String(256), nullable=False)
    User_Email=db.Column(db.String(256), nullable=False)



@app.route('/crb', methods=['GET'])
def get_company_region_branches():
    # Execute the raw SQL query using the text construct
    result = db.session.execute(
        text('SELECT First_name, Last_name, User_email, User_id FROM Users')
    )
    # Fetch all results as a list of dictionaries
    rows = result.fetchall()
    result_list = [
        {
            'First_name': row.First_name,
            'User_id': row.User_id,
            'Last_name': row.Last_name,
            'User_email': row.User_email
        } for row in rows
    ]
    return jsonify(result_list)

@app.route('/data')
def getdata():
    user = Users.query.all()

    output= []
    for u in user:
        user_data = {
            'First_name':u.First_name,
            'Last_name':u.Last_name,
            'User_email': u.User_Email
        }
        output.append(user_data)
    return {"data": output}

@app.route('/data/<id>')
def get_data_by_id(id):
    user=Users.query.get_or_404(id)
    return {'firs_name':user.First_name,'Last_name':user.Last_name, 'email':user.User_Email}


@app.route('/data', methods=['POST'])
def create_user():
    data = request.get_json()
    First_name = data.get('first_name')
    Last_name = data.get('last_name')
    User_Email = data.get('email')

    if not First_name or not Last_name or not User_Email:
        return jsonify({'error': 'Missing required parameters'}), 400

    user = Users(First_name=First_name, Last_name=Last_name, User_Email=User_Email)
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    user=Users.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"success":"Successfully Deleted"})

def __repr__(self):
    return f'{self.First_name}'

if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True)