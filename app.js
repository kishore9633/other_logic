const express = require('express');
const bodyparser = require('body-parser')
const db = require('.//db/db')
const mongoose = require('mongoose');

const ObjectId= mongoose.Types.ObjectId;

const {
    urlencoded,
    json
} = require('body-parser');
const authormodel = require('.//model/author').authormodel
// const {create} = require('.//controller/controller')
const app = express();
app.use(bodyparser.json());
app.use(urlencoded({
    extended: false
}));


app.post('/create', (req, res) => {
    let newAuthor = req.body
    let author = new authormodel(newAuthor)
    author.save(function (err, data) {

        if (err) {
            console.log(err)
        } else {


            res.status(200).send(data)
            // err ? console.log(err):console.log(data)  simple line
        }
    })
})



app.get('/authors', (req, res) => {
    authormodel.find({}, function (err, data) {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// by id

app.get('/author',(req,res)=>{
    console.log(req.query.id)
    if(req.query && req.query.id){
        var id = req.query.id;
    }else{
        res.status(400).send('missing parameter id')
    }
    
authormodel.findOne({_id:ObjectId(id)},(err,data)=>{
    if(err){
        res.status(400).send(err)
    }else{
        res.status(200).send(data)
        
    }
})
})


//update

app.put('/modify',(req,res)=>{
    if(req.body){
       var id= req.body.id

        var updateJson ={
            name:req.body.name,
            age:req.body.age
        }
    }else{
        res.status(400).send('missing parameter id and name')
    }
    authormodel.findOneAndUpdate({_id:ObjectId(id)},{
        $set:updateJson
    },(error,data)=>{
if(error){
    res.send(error)
}else{
    res.send("updated"+data)
}
    })
})
const port = 3001;


app.listen(port, () => {
    console.log('server running')
})