import {createWorkout, getWorkout, updateWorkout, deleteWorkout} from "../../src/workout";

export default async function handler(req, res) {
    const method = req.method;
    let data;
    let username;
    let title;
    let date;
    let exercises;
    let startTime;
    let endTime;
    let oldStartTime;
    let oldEndTime;
    let oldDate;
    let oldTitle;
    if (method != 'GET') {
        data = JSON.parse(req.body);
        username = data.username;
        title = data.title;
        date = data.date;
        exercises = data.exercises;
        startTime = data.startTime;
        endTime = data.endTime;
    }
    let result;
    switch (method) {
        case 'GET':
            result = await getWorkout();
            res.statusCode = 200;
            res.json({...result});
            break;
        case 'POST':
            result = await createWorkout(username, title, date, startTime, endTime, exercises);
            res.json({...result});
            res.statusCode = 200;
            break;
        case 'PUT':
            oldDate = data.oldDate;
            oldTitle = data.oldTitle;
            oldStartTime = data.oldStartTime;
            oldEndTime = data.oldEndTime;
            result = await updateWorkout(username, title, date, startTime, endTime, exercises, oldTitle, oldDate, oldStartTime, oldEndTime);
            res.json({...result});
            res.statusCode = 200;
            break;
        case 'DELETE':
            oldDate = data.oldDate;
            oldTitle = data.oldTitle;
            oldStartTime = data.oldStartTime;
            oldEndTime = data.oldEndTime;
            result = await deleteWorkout(username, oldTitle, oldDate, oldStartTime, oldEndTime);
            res.json({...result});
            res.statusCode = 200;
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}