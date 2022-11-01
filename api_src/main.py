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
        #cursor.close()
        connection.close()

@app.route('/register', methods = ['POST'])
def register():
    try:
        data = request.get_json(force=TRUE)
        username = data['username']
        password = data['password']
        print(username)
        print(password)

        if username and password and request.method == 'POST':
            connection = mysql.connect()
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            insert_query = "INSERT INTO user (username, password) VALUES(%s, %s)"
            data_to_insert = (username, password)
            cursor.execute(insert_query, data_to_insert)
            connection.commit()
            response = jsonify('Account created successfully!')
            response.status_code = 200
            return response
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        connection.close()


@app.route('/update', methods = ['POST'])
def update_data():
    try:
        data = request.get_json(force=TRUE)
        username = data['username']  #Username
        input = data['input']     #What data that user input
        col = data['col']   #What colun I need to change


        print(username)
        print(input)
        print(col)
        if username and input and col and request.method == 'POST':
            connection = mysql.connect()
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            insert_query = "UPDATE Workout SET %s = %s WHERE username = %s"
            data_to_insert = (col, input, username)
            cursor.execute(insert_query, data_to_insert)
            connection.commit()
            response = jsonify('Data changed successfully!')
            response.status_code = 200
            return response
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        connection.close()

@app.route('/delete', methods = ['POST'])
def delete_data():
    try:
        data = request.get_json(force=TRUE)
        
        col = data['col']   #What colun I need to delete
        select = data['input']     #What data that user select

        print(input)
        print(col)
        
        if  select and col and request.method == 'POST':
            connection = mysql.connect()
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            insert_query = "DELETE FROM Workout WHERE %s = %s"
            data_to_insert = (col, select)
            cursor.execute(insert_query, data_to_insert)
            connection.commit()
            response = jsonify('Data delete successfully!')
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