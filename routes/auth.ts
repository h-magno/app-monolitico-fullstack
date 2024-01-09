import express from 'express';
import UserController from '../controllers/UserController';

const auth = express.Router();

const userCtrl = new UserController

auth.post('/login', async (req, res) => {
    const user = await userCtrl.login(req.body.userEmail, req.body.password)
    if(user) {
        if(user.active) {
            res.statusCode = 200
            res.json(user)
        }
        else {  
            res.statusCode = 200
            res.json({msg: 'Usuário inativo'})
        }
    }  
    else {
        res.statusCode = 404
        res.json({})
    }
})

auth.post('/register', async (req, res) => {
    const result = await userCtrl.register(req.body.email, req.body.username, req.body.name, req.body.password)
    
    if(result) {
        res.json({'msg': 'Usuário criado'})
        return
    }
    res.statusCode = 400
    res.json({'msg': 'Erro ao criar usuário'})
})

auth.get('/confirm-email', async (req, res) => {
    const result = await userCtrl.emailConfirmation(req.query.token)
    if(result) {
        res.render('confirm-email', {
            status: 200,
            url_font: 'http://localhost:3000/login',
            msg: 'Usuário ativado'
        })
        return   
    }
        res.render('confirm-email', {
            status: 0,
            url_font: '',
            msg: 'Erro ao confirmar o email'
        })
})

auth.patch("/forgot-password", async (req, res) => {
    const result = await userCtrl.forgotPassword(req.body) 

 })
 
auth.post("/new-password", async (req, res) => {
    const result = await userCtrl.newPassword(req.body.email) 
    res.statusCode = result.status
    res.send(result.result)
 })


export default auth;