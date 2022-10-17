import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request

@app.route('/insert', methods = ['POST'])
def insert_data():
    try:
        print(request.method)
        data = request.get_json(force=True)
        print(data)
        username = data['username']
        print(username)
        if username and request.method == 'POST':
            connection = mysql.connect()
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            insert_query = "INSERT INTO Account(AccID, Username) VALUES(%s, %s)"
            data_to_insert = (1, username)
            cursor.execute(insert_query, data_to_insert)
            connection.commit()
            response = jsonify('Account added successfully!')
            response.status_code = 200
            return response
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        connection.close()

@app.errorhandler(404)
def showMessage(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone

if __name__ == "__main__":
    app.run()