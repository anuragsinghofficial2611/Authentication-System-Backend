const app = require('./app');
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});
const connectDB = require('./configs/db')

connectDB();
console.log(process.env.MONGO_URI)

app.listen(3000, () => {
    console.log("server is live at port 3000")
})