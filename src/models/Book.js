import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
  title: String,
  author: String
});

const Book = model('Book', BookSchema);

export default Book;
