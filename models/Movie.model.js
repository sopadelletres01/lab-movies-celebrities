//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  genre: String,
  plot: String,
  cast: [{type:ObjectId,ref:"Celebrity"}],
});

const Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie;
