import { createAccount } from "../../src/login_Register";

export default async function handler(req, res) {
    const method = req.method;
    let data;
    let username;
    let password;
    if (method != 'GET') {
        data = JSON.parse(req.body);
        username = data.username;
        password = data.password;
    }
    let result;
    switch (method) {
        case 'GET':
            // console.log("here");
            result = await getInfo(username);
            res.statusCode = 200;
            res.json({ ...result});
            break;
        case 'POST':
            result = await createAccount(username, password);
            res.json({ ...result});
            res.statusCode = 200;
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}