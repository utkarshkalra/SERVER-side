const express=require('express');
const app=express();
const Datastore=require('nedb');


app.use(express.static('public'));
app.use(express.json({limit: '1mb' }));

// app.get('/',(req,res)=> app.render.static('public')

const database=new Datastore('database.db');
database.loadDatabase();


app.post('/api',(req,res) => {
    console.log('i got a req');
    const data=req.body;
    const timestamp=Date.now();;
    data.timestamp=timestamp;
    database.insert(data);
 
    res.json({
        status:"Successfull",
        timestamp:timestamp,
        latitude:data.lat,
        longitude:data.long
    });
});

app.listen(3000,()=>console.log('connected'))
