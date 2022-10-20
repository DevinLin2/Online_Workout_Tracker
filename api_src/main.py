from pickle import TRUE
import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request

@app.route('/insert', methods = ['POST'])
def insert_data():
    try:
        data = request.get_json(force=TRUE)
        username = data['username']
        exercise = data['exercise']
        date = data['date']
        sets = data['sets']
        reps = data['reps']
        print(username)
        print(exercise)
        print(date)
        print(sets)
        print(reps)
        if username and exercise and date and sets and reps and request.method == 'POST':
            connection = mysql.connect()
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            insert_query = "INSERT INTO Workout (username, exercise, date, sets, reps) VALUES(%s, %s, %s, %s, %s)"
            data_to_insert = (username, exercise, date, sets, reps)
            cursor.execute(insert_query, data_to_insert)
            connection.commit()
            response = jsonify('Workout added successfully!')
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