const express=require('express');
const cors = require('cors');
const app=express();
const Datastore=require('nedb');


app.use(cors());

app.use(express.static('public'));
app.use(express.json({limit: '5mb' }));

// app.get('/',(req,res)=> app.render.static('public')

const database=new Datastore('database.db');
database.loadDatabase();


app.post('/api',(req,res) => {
    console.log('i got a req');
    const data=req.body;
    const timestamp=Date.now();;
    data.timestamp=timestamp;
    database.insert(data);
 
    res.json(data);
});

app.get('/api',(req,res)=>{
    database.find({},(err , data)=>{
        if(err){
            res.end();
            return;
        }
        res.json(data);
    })
})

app.listen(3000,()=>console.log('connected at port:3000'))
