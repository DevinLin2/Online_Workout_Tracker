import {createWorkout} from "../../src/workout";

export default async function handler(req, res) {
    const method = req.method;
    let result;
    switch (method) {
        case 'POST':
            const data = JSON.parse(req.body);
            const title = data.title;
            const date = data.date;
            const exercises = data.exercises;
            result = await createWorkout(title, date, exercises);
            res.json({...result, message: `workout created`});
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}