const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
};

const password = process.argv[2];

const url = `mongodb+srv://radu:${password}@cluster0.jieximt.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'Clean the car',
//   important: false,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close();
})