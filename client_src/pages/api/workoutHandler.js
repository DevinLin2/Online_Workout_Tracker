import {createWorkout, getWorkout} from "../../src/workout";

export default async function handler(req, res) {
    const method = req.method;
    let result;
    switch (method) {
        case 'GET':
            result = await getWorkout();
            res.statusCode = 200;
            res.json({...result, message: `workout sent`});
            break;
        case 'POST':
            const data = JSON.parse(req.body);
            const username = data.username;
            const title = data.title;
            const date = data.date;
            const exercises = data.exercises;
            result = await createWorkout(username, title, date, exercises);
            res.json({...result, message: `workout created`});
            res.statusCode = 200;
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}