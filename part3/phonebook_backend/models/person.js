const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    validate: {
      validator: function(number) {
        return /^\d{2,3}-\d+/.test(number);
      }
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = document._id;
    delete returnedObj.__v;
    delete returnedObj._id;
  }
})

module.exports = mongoose.model('Person', personSchema);



