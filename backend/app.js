const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes/routes");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(3001, () => {
    console.log('server started on port 3001');
})