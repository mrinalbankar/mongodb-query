const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors');
const connectDatabase = require('./config/database.js')

// const meetingRoute = require('./routes/meeting')
// const studentRoute = require('./routes/student')
// const professorRoute = require('./routes/professor')

app.use(
  cors(),
  express.urlencoded({ extended: true }),
  express.json()
)

dotenv.config({ path: __dirname + '/.env' });

connectDatabase()

//add routes
// app.use("/api/meetings", meetingRoute)
// app.use("/api/students", studentRoute)
// app.use("/api/professors", professorRoute)

const PORT = process.env.PORT || 5050

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
)