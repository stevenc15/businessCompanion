const express = require('express');
const router = express.Router();
const Client = require('../Schemas/clientSchema.js'); //activity model
const jwtKey = process.env.JWT_SECRET; //jwt key
const ensureAuthenticated = require ('./Route_utils/authentication'); //create helper function `for jwts
const QRCode = require('qrcode');
const {getDriveClient, getSheetsClient} = require('../googleClient.js');
require("dotenv").config();

router.get('/get-sheet', ensureAuthenticated, async(req,res)=>{
    try{
        res.status(200).json({url: process.env.GOOGLE_SHEET_EMBED_URL});
    }catch(error){
        console.error('Error fetching sheet:', error.message);
        res.status(500).json({error: "failed to get sheet data"});
    }
});

router.get('/get-export-sheet', ensureAuthenticated, async(req, res)=>{
    try{
        res.status(200).json({url: process.env.GOOGLE_SHEET_EXPORT_URL});
    }catch(error){
        console.error('Error fetching sheet:', error.message);
        res.status(500).json({error: "failed to get EXPORT sheet"});
    }
});

//fetch clients
router.get('/getClients', ensureAuthenticated, async (req, res)=>{
    try{
        const clients = await Client.findAll();
        if (!clients){
            return res.status(401).json({message: 'error retrieving clients'});
        }
        res.status(200).json(clients);
    }catch(error){
        res.status(500).json({message: 'failed to retrieve client data'})
    }
})

//add client
router.post('/addClient', ensureAuthenticated, async (req, res)=> {

    try{
        const {ClientName, Address, Community} = req.body;

        await Client.create({
            ClientName: ClientName,
            Address: Address,
            Community: Community
        });

        res.status(200).json({message: 'successfully added client to database'});
    }catch(error){
        console.error(err);
        res.status(500).json({error: 'Failed to save client'});
    }
});

//get QR for client
router.post('/getQR', ensureAuthenticated, async (req, res)=> {
    try{
        const {ClientId} = req.body;

        if (!ClientId){
            return res.status(401).json({ message:'Client ID missing '});
        }

        const qrLink = `https://business-companion-seven.vercel.app/employee?ClientId=${ClientId}`;

        const qrCodeDataURL = await QRCode.toDataURL(qrLink);

        if (!qrCodeDataURL){
            return res.status(405).json({message: 'unsuccessful qr code generation'});
        }
        
        res.status(200).json({qrCode: qrCodeDataURL});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

//modify client
router.post('/editClient', ensureAuthenticated, async (req, res)=> {
    try{
        const {ClientId, ClientName, Address, Community} = req.body;

        const client = await Client.findOne({
            where: {ClientId: ClientId}
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        client.ClientName=ClientName;
        client.Address=Address;
        client.Community=Community;

        await client.save();
        
        res.status(200).json({message: 'successful edit of client info'});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to edit client data'});
    }
});

//delete client
router.post('/deleteClient', ensureAuthenticated, async (req, res)=> {
    try{
        const {ClientId} = req.body;

        const client = await Client.findOne({
            where: {ClientId: ClientId}
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        await client.destroy();
        
        res.status(200).json({message: 'successful deletion of client info'});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to delete client data'});
    }
});

module.exports = router;