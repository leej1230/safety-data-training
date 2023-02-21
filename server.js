const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.json({message: "Hello World!"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
})