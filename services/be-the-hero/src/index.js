const express = require('express');
const routes = require('./routes');

// cors eh modulo de seguranca
// determina quem pode acessar essa aplicacao
const cors = require('cors');

const app = express();

app.use(cors()); // dessa forma todas as app front podem ter acesso

// // projeto em producao
// app.use(cors({
//     origin: 'http://bethehero.com' // qual endereco pode acessar a aplicacao (onde o front esta hospedado)
// }));

// antes de todas as req, express converter json em javascript object. body=req.body -> undefined
app.use(express.json());
app.use(routes);

app.listen(3333); //node 3333 | react 3000