const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url).then(result => {
  console.log("Connected to MongoDB");
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObj, options) => {
    returnedObj.id = document._id;
    delete returnedObj.__v;
    delete returnedObj._id;
  }
})

module.exports = mongoose.model('Person', personSchema);



