// importing express
const express = require('express')
// importing connection to mongodb
const db = require ('./config/connection')
// importing routes (needs to be built out)
const routes = require ('./routes')

// setting port to either local host or connecting with env crendetials
const PORT = process.env.port || 3001;
// renaming express to application
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`We're live and alive on Port ${PORT}~!`);
  });
});
