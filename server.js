const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// rota simples

app.get("/", (req, res) => {
    res.json({message: "Hello world"})
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('servidor rodando na porta: ${PORT}')
});