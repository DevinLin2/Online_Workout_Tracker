from typing import Final, final
from config import mysql
import pymysql

try:
    connection = mysql.connect()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    account_table = """CREATE TABLE Account (
                        AccID           int(15)         NOT NULL,
                        Username        varchar(30)     NULL,
                        PRIMARY KEY (AccID))"""
    cursor.execute(account_table)
    connection.commit()

except Exception as e:
    print(e)

finally:
    cursor.close()
    connection.close()