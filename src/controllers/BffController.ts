import {Request, Response} from "express"
import { AxiosStatic } from "axios";




class BffController{

    constructor(protected httpManager: AxiosStatic, protected path: string){
        Object.assign(this, [httpManager, path])
    }

 bffpost = async (req: Request, res: Response) => {
    
    try {
        
        const data: {} = req.body;
        const APIReturn = await this.httpManager.post(this.path, data);
    
        console.log(APIReturn);
        
    
        return res.json(APIReturn);
    
    }

    catch (error: any) {
        
       const APIReturn = {
        errorCode: error.code,
        errorMessage: error.message
       }

        return  res.json(APIReturn)
    }
}

}

export default BffController;