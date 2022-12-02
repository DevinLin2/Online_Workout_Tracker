import { createMeal, getMeal } from "../../src/meal";

export default async function handler(req, res) {
    const method = req.method;
    let data;
    let username;
    let date;
    let meals;
    if (method != 'GET') {
        data = JSON.parse(req.body);
        username = data.username;
        date = data.date;
        meals = data.meals;
    }
    let result;
    switch (method) {
        case 'GET':
            console.log("here");
            result = await getMeal();
            res.statusCode = 200;
            res.json({ ...result});
            break;
        case 'POST':
            result = await createMeal(username, date, meals);
            res.json({ ...result});
            res.statusCode = 200;
            break;
        // case 'PUT':
        //     oldDate = data.oldDate;
        //     oldTitle = data.oldTitle;
        //     oldStartTime = data.oldStartTime;
        //     oldEndTime = data.oldEndTime;
        //     result = await updateWorkout(username, title, date, startTime, endTime, exercises, oldTitle, oldDate, oldStartTime, oldEndTime);
        //     res.json({...result, message: `workout updated`});
        //     res.statusCode = 200;
        //     break;
        // case 'DELETE':
        //     oldDate = data.oldDate;
        //     oldTitle = data.oldTitle;
        //     oldStartTime = data.oldStartTime;
        //     oldEndTime = data.oldEndTime;
        //     result = await deleteWorkout(username, oldTitle, oldDate, oldStartTime, oldEndTime);
        //     res.json({...result, message: `workout deleted`});
        //     res.statusCode = 200;
        //     break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}