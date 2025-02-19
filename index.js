const express = require('express');
const app = express();

require('./config/db')
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // For parsing JSON request bodies
require('dotenv').config(); // Load environment variables
const adminRouter=require("./routes/router")
const authRoutes = require('./routes/authRoutes');




// Middleware to parse JSON bodies
app.use(express.json());

//ROUTERS 
// Use authentication routes
app.use('/auth', authRoutes);
app.use("/opas",adminRouter)


  
app.post("/check",async(req,res)=>{
  data="ok this is node.js"
  res.send(JSON.stringify(data))
})



const port=process.env.port;

// Start the server
app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});
