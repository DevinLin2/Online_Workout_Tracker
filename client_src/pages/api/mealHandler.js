import { createMeal, getMeal, updateMeal, deleteMeal } from "../../src/meal";

export default async function handler(req, res) {
    const method = req.method;
    let data;
    let username;
    let date;
    let meals;
    let oldDate;
    if (method != 'GET') {
        data = JSON.parse(req.body);
        username = data.username;
        date = data.date;
        meals = data.meals;
    }
    let result;
    switch (method) {
        case 'GET':
            // console.log("here");
            result = await getMeal();
            res.statusCode = 200;
            res.json({ ...result});
            break;
        case 'POST':
            result = await createMeal(username, date, meals);
            res.json({ ...result});
            res.statusCode = 200;
            break;
        case 'PUT':
            oldDate = data.oldDate;
            result = await updateMeal(username, date, meals, oldDate);
            res.json({...result});
            res.statusCode = 200;
            break;
        case 'DELETE':
            oldDate = data.oldDate;
            result = await deleteMeal(username, oldDate);
            res.json({...result});
            res.statusCode = 200;
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}