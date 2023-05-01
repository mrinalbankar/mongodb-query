const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors');

mongoose.set('strictQuery', true)

dotenv.config({ path: __dirname + '/config/.env' });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to Database')
    const db = mongoose.connection.db;
    // db.collection('automotive').find({}).toArray(function (err, data) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log(data);
    // return res.send(data);
    //   }
    // }
    // );

    //Male Users which have phone price greater than 10,000
    app.get("/api_one", async (req, res) => {
      try {
        const result = db.collection('automotive')
          .find({
            $and: [{ gender: "Male" },
            { $expr: { $gt: [{ $toInt: "$phone_price" }, 10000] } }]
          })
          .toArray(function (err, data) {
            if (err) {
              console.log(err)
            } else {
              // console.log(data);
              return res.send(data);
            }
          });
      } catch (err) {
        res.status(500).json(err)
      }
    })

    //Users whose last name starts with “M” and has a quote character length greater than 15 
    //and email includes his/her last name
    app.get("/api_two", async (req, res) => {
      try {
        const result = db.collection('automotive')
          .find({
            $and: [{ first_name: /^M/ },
            { $where: function () { return (this.first_name.length > 15) } },
            { "$expr": { $indexOfCP: ["email", "$last_name"] } }]
          })
          .toArray(function (err, data) {
            if (err) {
              console.log(err)
            } else {
              // console.log(data);
              return res.send(data);
            }
          });
      } catch (err) {
        res.status(500).json(err)
      }
    })

    //Users which have a car of brand “BMW”, “Mercedes” or “Audi” and 
    //whose email does not include any digit.
    app.get("/api_three", async (req, res) => {
      try {
        const result = db.collection('automotive')
        .find({
          $and: [{ car: { $in: ["BMW", "Mercedes", "Audi"] } }]
          // $and: [{ car: { $in: ["BMW", "Mercedes", "Audi"] } },
          // { $isNumber: "$email" }]
        })
          .toArray(function (err, data) {
            if (err) {
              console.log(err)
            } else {
              // console.log(data);
              return res.send(data);
            }
          });
      } catch (err) {
        res.status(500).json(err)
      }
    })


  })
  .catch((err) => { console.log(err) })

app.use(
  cors(),
  express.urlencoded({ extended: true }),
  express.json()
)

const PORT = process.env.PORT || 5050

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
)