from crypt import methods
import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request

@app.route('/insert', methods = ['POST'])
def insert_data():
    try:
        data = request.json
        username = data['username']
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
            return 'Failed to add account'
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        connection.close()