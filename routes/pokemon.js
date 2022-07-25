import { Router } from 'express'
import pkmnModel from "../models/pkmn.js"
import UserModel from '../models/user.js'
import routeGuard from '../authGuard.js'
import multer from "multer";

const pkmnRouter = Router()
//image
const storage = multer.diskStorage({
  // destination pour le fichier
  destination:function(req,file,callback){
    callback(null,'./assets/uploads/images' )
  },
  //ajouter le retour de l'extension
  filename:function (req,file,callback) {
    callback(null,Date.now() + file.originalname)
  },
})

//upload parametre pour multer

const upload = multer({
  storage:storage,
  limits:{
    fieldSize:1024*1024*3,
  },
})

pkmnRouter.get('/pokemons', routeGuard, async (req, res) => {
  
  let userConnected = await UserModel.findOne({_id: req.session.user})
  if (userConnected) {
    userConnected = userConnected.name
  }
  let users = await pkmnModel.find({userId: req.session.user})
  res.render('list-pkmn.twig', {
    users: users,
    userConnected: userConnected

  });

})
pkmnRouter.get('/pokemon', async (req, res) => {
  let users = await pkmnModel.find()
  res.render('add-pkmn.twig');

})
pkmnRouter.get('/pokemon/:id', async (req, res) => {
  try {
    let user = await pkmnModel.findOne({ _id: req.params.id })
    res.json(user)
  } catch (error) {
    console.log(error);
  }
})
pkmnRouter.post('/pokemon',upload.single('image'), async (req, res) => {
  try {
    req.body.userId = req.session.user
    req.body.img = req.file.filename;
    const newUser = new pkmnModel(req.body)
    await newUser.save()
    res.redirect('/pokemons')
  } catch (error) {
    console.log(error);
  }
});
pkmnRouter.get('/deletePkmn/:id', async (req, res) => {
  try {
    await pkmnModel.deleteOne({ _id: req.params.id })
    // await user.deleteOne({ _id: entry._id });
    //pkmnModel.splice(pkmnModel.indexOf(user),1)
    res.redirect('/pokemons')
  } catch (error) {
    // console.log(error);
    res.send(error)
  }
})
pkmnRouter.get('/updatePokemon/:id', async (req, res) => {
  try {
    let user = await pkmnModel.findOne({ _id: req.params.id })
    res.render('update.twig', {
      user: user
    })

  } catch (error) {
    res.send(error)
  }
})

pkmnRouter.post('/updatePokemon/:id', upload.single('image'), async (req, res) => {
  try {
    req.body.userId = req.session.user
    if(req.file)
    req.body.img = req.file.filename;
    await pkmnModel.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/pokemons")
  } catch (error) {
    console.log(error)
  }
})

//logout
pkmnRouter.get('/logout', function(req, res) {
  req.session.destroy()
 res.redirect('/login');
});
export default pkmnRouter