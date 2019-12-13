const express = require("express");
const bodyParser = require("body-parser");
const { sequelize, Feedback } = require("./models");

const app = express();
app.use(bodyParser.json());

app.post('/create', (request, response) => {
    Feedback.sync();
    
    try {
    for(let i = 0; i < 10; i++) {
        Feedback.create({ 
        startingPoint: 'start point' + i, 
        destinationPoint: 'end point' + i,
        transportType: 'METRO',
        departureHour: '0',
        tripDuration: i,
        crowdednessLevel: 'LOW',
        observations: 'observations' + i,
        satisfactionLevel: i
        });
    } } catch(err) {
        
    } finally {
        response.status(200).json({message:'feedback created'});
    }
});

app.get('/feedback', async (request, response) => {
   try {
       let feedbacks = await Feedback.findAll();
       
       response.status(200).json(feedbacks);
   } catch(err) {
       response.status(404).json({
           message: 'not found'
       });
   }
});

app.listen(8080, () => {
    console.log('server started on port 8080');
})