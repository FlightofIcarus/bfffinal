import "dotenv/config";
import {Request, Response} from "express"
import Axios from "axios";



async function bffController(req: Request, res: Response) {
    const data: {} = req.body;
    const path: string = String (process.env.API_PATH);
    const APIReturn = await Axios.post(path, data);

    res.json(APIReturn);

};


export default bffController;