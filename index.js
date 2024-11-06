const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');
const os = require('os')

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8)
const username = 'emqx_test'
const password = 'emqx_test'

const client = mqtt.connect('mqtt://broker.emqx.io:1883', {
    clientId,
    username,
    password,
})

const topic = '/thermal_comfort'
const qos = 0

mqttClient.on('connect',()=>{
    console.log('Connected to MQTT');
});

app.get('/',(req,res) =>{
    console.log("Connected on port = ",port);
})

app.post('/data',(req,res) => {
    const data = req.body;

    console.log(data);

    client.publish(topic, data, { qos }, (error) => {
        if (error) {
        console.error(error)
        }
    })
})

app.listen(port,()=>{
    console.log("Server running ");
})