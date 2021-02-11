import express from 'express';
import bodyParser = require('body-parser');
const cors = require('cors');
const { products } = require('./products.json');
const { employees } = require('./employeesDB.json');
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');

//controllers
const getorders = require('./controllers/getorders');
const getitem = require('./controllers/getitem');
const postorder = require('./controllers/postorder');
const login = require('./controllers/login');

const app = express();
const allOrders: any[] = require('./orders.json');

const PORT = 3232;
const PAGE_SIZE = 20;

app.use(cors());
app.use(bodyParser.json());
app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.get('/api/orders', (req, res) => {getorders.handleGetOrders(allOrders, products, PAGE_SIZE, req, res)});
app.get('/api/items/:itemId', (req, res) => {getitem.handleGetItem(products, req, res);});
app.post('/api/:orderId', (req, res) => {postorder.handlePostOrder(allOrders, req, res, fs);});
app.post('/api/employees/login', (req, res) => {login.handleLogin(req, res, employees, bcrypt);});

app.listen(PORT);
console.log('Listening on port', PORT);
