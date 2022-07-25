import UserModel  from "../models/user.js"
import { comparePassword } from "../bcript.js"
export class userController{
    static async login(req){
        let user = await UserModel.findOne({mail: req.body.mail})
        if (user) {
            if( await comparePassword(req.body.password, user.password)){
                return user
            } 
        }
        return null


    } 


}

export default userController