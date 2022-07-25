import { Router } from 'express'
import UserModel from "../models/user.js"
import { cryptPassword, comparePassword } from "../bcript.js";
import { userController } from "../controller/userController.js";

const userRouter = Router()




userRouter.get('/login', async (req, res) => {

  try {
    let user = await UserModel.findOne({ _id: req.params.id }, req.body);
    res.render('login.twig', {
      user: user
    });
  } catch (error) {
    res.send(error);
  }
});


userRouter.post('/login', async (req, res) => {

  let user = await userController.login(req)
  if (user) {
    req.session.user = user._id
    console.log(req.session);
    res.redirect('/pokemons')
  } else {
    res.redirect('/login')
  }
})


userRouter.get('/pokemon', async (req, res) => {
  let users = await UserModel.find()
  res.render('add-pkmn.twig');

})
userRouter.get('/user', async (req, res) => {
  let users = await UserModel.find()
  res.render('add-user.twig');

})
userRouter.get('/user/:id', async (req, res) => {

  try {
    let user = await UserModel.findOne({ _id: req.params.id })
    res.json(user)
  } catch (error) {
    console.log(error);
  }
})
userRouter.post('/user', async (req, res) => {

  try {
    req.body.password = await cryptPassword(req.body.password)
    let user = new UserModel(req.body)
    await user.save()
    req.session.user = user._id
    res.redirect('/login')        /**afficher la page principal après l'inscription en passant par la route index**/
  } catch (error) {
    console.log(error);
  }
})







/* try {
   const newUser = new UserModel(req.body)
   await newUser.save()
   res.redirect('/login')
 } catch (error) {
   console.log(error);
 }
});
*/



export default userRouter