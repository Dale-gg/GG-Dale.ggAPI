const cors       = require('cors');
const express    = require('express');
const routes     = require('./routes/routes');
const mongoose   = require('mongoose');
require('dotenv').config({path: ".env"});

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-uagp0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

// Liberando o acesso a API de outras portas com o Cors
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333);