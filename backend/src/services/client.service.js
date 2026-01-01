/**
 * client.service.js - handles client-related database operations
 */

const Client = require('../models/Client')

async function getAllClients(){
    return Client.findAll();
}

async function getOneClient(ClientId){
    return await Client.findOne({
            where: {ClientId: ClientId}
        })
}

async function editClient(client, updates){
    const {ClientName, Address, Community} = updates;

    client.ClientName=ClientName;
    client.Address=Address;
    client.Community=Community;

    await client.save();

    return client;
}

async function createClient({ClientName, Address, Community}){
    
    return Client.create({
            ClientName: ClientName,
            Address: Address,
            Community: Community
           });
}

async function deleteClient(client){
   await client.destroy();
}

module.exports = {
    getAllClients,
    getOneClient,
    editClient,
    createClient,
    deleteClient
};