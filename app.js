// create server with express nodejs 

const express = require('express');
const axios = require('axios');
const fetch = require('node-fetch');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended : true
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/convert-mp3', async (req, res) => {
    const videoID = req.body.vID;
    if(videoID !== undefined && videoID !== null && videoID !== ''){
        // run query 
        const url = "https://youtube-mp36.p.rapidapi.com/dl?id="+videoID;




        // fetching api response with axios api

        const axiosResponse = axios.request({
            method : "GET",
            url : url,
            params : {id : videoID},
            headers : {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        });

        axiosResponse.then(response => {
            //console.log(response);
            return res.render('index', {
                video_title : response.data.title,
                video_link : response.data.link,
                success : true
            })
        }).catch(e => {
            return res.render('index', {
                success : false,
                message : "Could not get the data "+e
            })
        });


        // //  Fetching api response with fetch api 
        // const options = {
        //     "method" : "GET",
        //     "headers" : {
        //         'X-RapidAPI-Key': process.env.API_KEY,
        //         'X-RapidAPI-Host': process.env.API_HOST
        //     }
        // }
        // const fetchQuery =  fetch(url, options);

        // fetchQuery
        //     .then((data) => data.json())
        //     .then(response => {
                
        //         if(response.status === 'fail'){

        //             return res.render('index', {
        //                 message : response.msg,
        //                 success : false
        //             })
                    
        //         }else{
        //             return res.render('index', {
        //                 video_title : response.title,
        //                 video_link : response.link,
        //                 success : true
        //             })
                    
        //         }

        //     }).catch(e => {
        //         return res.render('index', {
        //             message : 'Could not convert the '+videoID+' to mp3.<br/>'+e,
        //             success : false
        //         })
        //     }) 


    }else{
        return res.render('index', {
            message : 'Please enter youtube video ID',
            success : false
        })
    }
})


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})