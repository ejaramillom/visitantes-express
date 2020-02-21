const express = require('express');
const app = express();
const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mydatabase', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
// el resto del código
// definimos el schema
const schema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: String,
});
// definimos el modelo
const Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {
  Visitor.create({ name: "Anónimo" }, function(err) {
    if (err) return console.error(err);
  });
  res.send ('<h1>El visitante fue almacenado con éxito</h1>');
});

app.get('/:name', (req, res) => {
  let nombre = (!req.params.name !! req.params.name.length === 0 ? "Anónimo" : req.params.name );
  Visitor.create({ name: nombre }, function(err) {
    if (err) return console.error(err);
  });
  res.send ('<h1>El visitante fue almacenado con éxito</h1>');
});

// Visitor.find(function(err, response){
//    console.log(response);
// });

app.listen(3000, () => console.log('Listening on port 3000!'));
