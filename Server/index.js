require('dotenv').config();
const express = require('express')
const pkg = require('pg');

const app = express()
const { Pool } = pkg;

const userRouter = require("./Routes/userRoute.js");
const dataRouter = require("./Routes/dataRoute.js"); 

const cors = require('cors');
app.use(cors());

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon SSL
  },
});

// Test the connection
pool.connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL!"))
  .catch((err) => console.error("❌ Connection error:", err.stack));


app.use('/auth',userRouter);
app.use('/data',dataRouter);




const port = process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}!`))