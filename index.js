//configs imports
const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')

const Person = require('./models/Person')

//cors
app.use(cors())
//ler json
app.use (express.urlencoded({extended: true,}))
app.use(express.json())
app.use(express.static('pages'))

//rotas externas 
//const personRoute = require('./routes/personRoutes.js')


//app.use('/person',personRoute)



//rotas endpoint

app.get('/ola',(req,res)=>{
    res.json({mensage:"deu certinho"})
})

app.get('/',(req,res)=>{
    res.json({mensage:"home"})
})

app.get('/nova', (req,res) =>{
    res.json({message:"nova rota"})
})


const DB_USER= process.env.DB_USER
const DB_PASSWORD= encodeURIComponent(process.env.DB_PASSWORD)
const PORT = process.env.PORT || 3000

//db e listen 5IHvoyVoHJJaMmmN
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusternameapi.sms3b.mongodb.net/minhaapi?retryWrites=true&w=majority`)
.then(()=>{
    //listen
    console.log('connect mongoDB')
    app.listen(PORT, ()=>{
    console.log('listen on port: ' + PORT)
})
})
.catch((err) => {console.log(err)})
