import UserModel from './models/user.js'

let routeGuard = async (req, res, next) =>{
    let user = await UserModel.findOne({_id: req.session.user} ,{password: 0})
    console.log(req.session.user + "ici");
    if (user) {
        next()  
    }else{
        res.redirect('/login')
    }   
}

export default routeGuard