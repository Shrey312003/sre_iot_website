const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');
const os = require('os')

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

const mqttClient = mqtt.connect('mqtt://localhost:1883')

mqttClient.on('connect',()=>{
    console.log('Connected to MQTT');
});

app.get('/',(req,res) =>{
    const interfaces = os.networkInterfaces();

    for(const val in interfaces){
        for(const iface of interfaces[val]){
            if(iface.family == 'IPv4' && !iface.internal){
                console.log(`Server IP: ${iface.address}`)
            }
        }
    }
})

app.post('/data',(req,res) => {
    const data = req.body;

    mqttClient.publish('user_data',JSON.stringify(data),(err)=>{
        if(err){
            console.error("Failed to publish to mqtt",err);
            res.status(500).send("Failed to publish to mqtt");
        }

        else{
            console.log('DAta published ',data);
            res.status(200).send("Done");
        }
    })
})

app.listen(port,()=>{
    console.log("Server running ");
})