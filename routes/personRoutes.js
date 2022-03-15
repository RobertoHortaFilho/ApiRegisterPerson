const routes = require('express').Router();
const { Router } = require('express');
const { response } = require('express');
const Person = require('../models/Person.js')

//rotas API
//create
routes.post('/', async (req,res) =>{
    //tratamento
    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({error:'Nome é obrigatorio!'})
        return
    }
    if(!salary){
        res.status(422).json({error:'salario é obrigatorio!'})
        return
    }
    const person = {
        name,
        salary,
        approved,
    }
    //criar dados

    try{
        await Person.create(person)
        res.status(201).json({message:'pessoa inserida no sistema com sucesso!'})
        

    }catch(err){
        res.status(500).json({error: err})
    }


})

//read 
routes.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people) 

    } catch (error) {
        res.status(500).json({error})
    }
})

routes.get('/:id', async (req,res) =>{
    const id = req.params.id;
    try{
        const person = await Person.findOne({_id: id })

        if(!person){
            res.status(424).json({message:'usuario nao cadastrado'})
            return
        }
        res.status(200).json({person})
    }catch(error){
        res.status(500).json({error})
    }
})

//update (put, patch)
//put = obj completo
//patch = atualizaçao parcial

routes.patch('/:id', async (req,res) =>{
    const id = req.params.id;
    const {name, salary, approved } = req.body;

    const person = {name, salary, approved}

    try{

        const updatedPerson = await Person.updateOne({_id:id}, person)

        if (updatedPerson.matchedCount === 0){
            res.status(424).json({message:'usuario nao cadastrado'})
            return
        }
        res.status(200).json(person)

    }catch(error){
        res.status(500).json(error)
    }
})

//delet

routes.delete('/:id', async (req,res) => {
    const id = req.params.id;

    const person = await Person.findOne({_id : id})

    if(!person){
        res.status(422).json({message:"user not found"})
        return;
    }

    try {
        await Person.deleteOne({ _id:id })

        res.status(200).json({message:'usuario removido com sucesso'})
    } catch (error) {
        res.status(500).json({error})
    }
})


module.exports = routes;