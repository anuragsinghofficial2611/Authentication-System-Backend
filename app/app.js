const express = require('express')
const UserModel = require('./models/user.model')
const cors = require('cors')
const authRoute = require("./routes/auth.route")


const app = express();
app.use(cors())
app.use(express.json());


app.use('/api/auth/',authRoute);


module.exports = app