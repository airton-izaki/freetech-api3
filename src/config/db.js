const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri, {});
    console.log('Conexão com MongoDB estabelecida');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
