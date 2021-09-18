const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

//lee variables de entorno creadas en mi file .env
const {config} = require("dotenv");
config();

const apiKey = process.env.API_KEY;

newsRouter.get('', async(req, res) => {
    try {
          const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=futbol&apiKey=${apiKey}`);
        //console.log(newsAPI.data.articles);        
       res.render('news', { articles : newsAPI.data.articles });

    } catch (err) {
        if(err.response) {
            res.render('news', { articles : null })
            // console.log(err.response.data)
            // console.log(err.response.status)
            // console.log(err.response.headers)
        } else if(err.request) {
            res.render('news', { articles : null })
            //console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            //console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=futbol&apiKey=${apiKey}`);
        const onlyNewsClick= newsAPI.data.articles[articleID]
        //console.log(newsAPI.data.articles[0]);
        res.render('newsSingle', { article : onlyNewsClick})
       
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            // console.log(err.response.data)
            // console.log(err.response.status)
            // console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSingle', { article : null })
            //console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null })
            //console.error('Error', err.message)
        }
    } 
})


newsRouter.post('', async(req, res) => {
    let search = req.body.search;
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`);      
        res.render('newsSearch', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            // console.log(err.response.data)
            // console.log(err.response.status)
            // console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            // console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            // console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 
