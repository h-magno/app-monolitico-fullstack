import express from "express";
const document = express.Router()

import DocController from "../controllers/DocController";

const docCtrl = new DocController()

document.get('/', async(req, res) => {
    const result = await docCtrl.getDocument(req.query)

    res.statusCode = result.status
    res.json(result)
}) 

document.get('/:id', async (req, res) => {
    if(req.params.id === '0'){
        return;
    }
    const result = await docCtrl.getDocumentById(req.params.id);
    res.statusCode = result.status;
    res.json(result);
})
// [ 
//     { id: 1, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 2, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 3, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 4, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 5, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 6, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 7, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 8, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 9, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
//     { id: 11, title: 'Snow', content: 'txtxtxttxtxtx', createdAt: 'Jon'},
// ]
document.post('/', async (req, res) => {
       const result = await docCtrl.createDoc(req.body);
       res.statusCode = result.status;
       res.json(result);
})

document.patch('/:id', async(req, res) => {
    const result = await docCtrl.updateDoc(req.params.id, req.body)
    res.json({

    })
})

document.delete('/:id', async(req, res) => {
    const result = await docCtrl.deleteDoc(req.params.id)
    console.log(result)
    res.statusCode = result.status
    res.json(result)
})





export default document