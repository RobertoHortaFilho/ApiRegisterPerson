//configs imports
const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

const Person = require('./models/Person')

//ler json
app.use (express.urlencoded({extended: true,}))
app.use(express.json())

//rotas externas 
const personRoute = require('./routes/personRoutes.js')


app.use('/person',personRoute)



//rotas endpoint
app.get('/', (req, res) =>{  
    res.json({message: 'oi express :)'})
})



const DB_USER= process.env.DB_USER
const DB_PASSWORD= encodeURIComponent(process.env.DB_PASSWORD)

//db e listen 5IHvoyVoHJJaMmmN
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusternameapi.sms3b.mongodb.net/minhaapi?retryWrites=true&w=majority`)
.then(()=>{
    //listen
    console.log('connect mongoDB')
    app.listen(3000, ()=>{
    console.log('listen on port 3000')
})
})
.catch((err) => {console.log(err)})