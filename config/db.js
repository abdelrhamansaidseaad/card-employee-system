// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/cardEmployeeDB', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('MongoDB Connected...');
//   } catch (err) {
//     console.error('Database connection error:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;



// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://username:password@cluster0.mongodb.net/cardEmployeeDB?retryWrites=true&w=majority', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error('Database connection error:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://username:password@cluster0.mongodb.net/cardEmployeeDB?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});