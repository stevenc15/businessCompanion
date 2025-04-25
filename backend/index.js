const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

//allows us to call .env file
require('dotenv').config();
const { Pool } = require('pg'); //for database connection

//connect to database
console.log(process.env.DATABASE_URL);
const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
});

//allow ports connection from frontend to backend
app.use(cors());
//parse any incoming data
app.use(express.json());

//Define post route
app.post('/api/activities', (req, res) => {
    const {name, task} = req.body;
    (async () => {
    try{
        await pool.query(
            'INSERT INTO activities (name, task) VALUES ($1, $2)',
            [name, task]
        );
        console.log(`Received: ${name} - ${task}`);
        res.json({message: "Activity saved to database"});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to save activity'});
    }
    })();      
});

//Define get route
app.get('/api/activities', (req, res) => {
    (async ()=> {
        try{
            const result = await pool.query('SELECT * FROM activities');
            res.json(result.rows);
        }catch(err){
            console.error(err);
            res.status(500).json({error: 'Failed to fetch activities'});
        }
    })();
});

//Approve an Activity
app.patch('/api/activities/:id/approve', (req, res) => {
    const {id} = req.params;
    (async () => {
        try{
            await pool.query('UPDATE activities SET approved = true WHERE id = $1', [id]);
            res.json({message: 'Activity Approved'});
        }catch(err){
            console.error(err);
            res.status(500).json({error: 'Failed to approve activity'});
        }
    })();
});

//Unapprove an Activity
app.patch('/api/activities/:id/unapprove', (req, res) => {
    const {id} = req.params;
    (async () => {
        try{
            await pool.query('UPDATE activities SET approved = false WHERE id = $1', [id]);
            res.json({message: 'Activity Unapproved'});
        }catch(err){
            console.error(err);
            res.status(500).json({error: 'Failed to unapprove activity'});
        }
    })();
});

//start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})