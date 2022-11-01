from typing import Final, final
from config import mysql
import pymysql

try:
    connection = mysql.connect()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    account_table = """CREATE TABLE Workout (
                        username        varchar(30)     NOT NULL,
                        exercise        varchar(30)     NULL,
                        date            varchar(30)     NULL,
                        sets            int(5)          NULL,
                        reps            int(5)          NULL,
                        PRIMARY KEY (username))"""
    user_table = """CREATE TABLE User (
                        username        varchar(30)     NOT NULL,
                        password        varchar(30)     NOT NULL,
                        PRIMARY KEY (username))"""
    cursor.execute(account_table)
    cursor.execute(user_table)
    connection.commit()

except Exception as e:
    print(e)

finally:
    cursor.close()
    connection.close()