from typing import Final, final
from config import mysql
import pymysql

try:
    connection = mysql.connect()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    workout_table = """CREATE TABLE Workout (
                        workoutID       int(5)              NOT NULL AUTO_INCREMENT,
                        username        varchar(30)         NULL,
                        title           varchar(30)         NULL,
                        date            varchar(30)         NULL,
                        startTime       varchar(30)         NULL,
                        endTime         varchar(30)         NULL,
                        exercises       JSON                NULL,
                        PRIMARY KEY (workoutID))"""
    user_table = """CREATE TABLE User (
                        userID          int(5)              NOT NULL AUTO_INCREMENT,
                        username        varchar(30)         NOT NULL,
                        password        varchar(30)         NOT NULL,
                        PRIMARY KEY (userID, username))"""
    # exercise_table = """CREATE TABLE Exercise_in_workout (
    #                     workoutID       int(5)                  NOT NULL,
    #                     exerciseID      int(5)                  NOT NULL AUTO_INCREMENT,
    #                     exercise        varchar(30)             NULL,
    #                     sets            varchar(30)             NULL,
    #                     reps            varchar(30)             NULL,
    #                     PRIMARY KEY (exerciseID),
    #                     CONSTRAINT Exercise_in_workout_workout_workoutID_fk FOREIGN KEY (workoutID) REFERENCES Workout(workoutID)
    #                         ON UPDATE CASCADE ON DELETE CASCADE)"""
    did_table = """CREATE TABLE Did (
                    workoutID       int(5)                  NOT NULL,
                    userID          int(5)                  NOT NULL,
                    username        varchar(30)             NOT NULL,
                    PRIMARY KEY (workoutID, userID, username),
                    CONSTRAINT Did_workout_workoutID_fk FOREIGN KEY (workoutID) REFERENCES Workout(workoutID)
                        ON UPDATE CASCADE ON DELETE CASCADE,
                    CONSTRAINT Did_user_userID_username_fk FOREIGN KEY (userID, username) REFERENCES User(userID, username)
                        ON UPDATE CASCADE ON DELETE CASCADE)"""
    cursor.execute(workout_table)
    cursor.execute(user_table)
    # cursor.execute(exercise_table)
    cursor.execute(did_table)
    connection.commit()

except Exception as e:
    print(e)

finally:
    cursor.close()
    connection.close()