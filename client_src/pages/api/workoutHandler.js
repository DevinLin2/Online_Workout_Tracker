import {createWorkout, getWorkout, updateWorkout} from "../../src/workout";

export default async function handler(req, res) {
    const method = req.method;
    let data;
    let username;
    let title;
    let date;
    let exercises;
    if (method != 'GET') {
        data = JSON.parse(req.body);
        username = data.username;
        title = data.title;
        date = data.date;
        exercises = data.exercises;
    }
    let result;
    switch (method) {
        case 'GET':
            result = await getWorkout();
            res.statusCode = 200;
            res.json({...result, message: `workout sent`});
            break;
        case 'POST':
            result = await createWorkout(username, title, date, exercises);
            res.json({...result, message: `workout created`});
            res.statusCode = 200;
            break;
        case 'PUT':
            const oldDate = data.oldDate;
            const oldTitle = data.oldTitle;
            result = await updateWorkout(username, title, date, exercises, oldTitle, oldDate);
            res.json({...result, message: `workout updated`});
            res.statusCode = 200;
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}