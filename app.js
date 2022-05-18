const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const errorHandler = require('./controllers/error');
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/job');
const app = express();

dotenv.config({
  path: './config/config.env',
});

app.use(
  express.json({
    limit: '50kb',
  })
);

app.use(cors());

app.use('/auth', authRouter);
app.use('/jobs', jobRouter);


app.use(errorHandler);

(async()=>{
  const options = {
      useUnifiedTopology:true,
      useNewUrlParser:true,
      serverSelectionTimeoutMS:10000,
      socketTimeoutMS:45000 
  }

  try{
      await mongoose.connect(process.env.CONNECT_MONGODB_LOCAL, options);
      console.log('Successfully connected to database');
  }
  catch (e){
      console.log('an error occurred while connecting to database', e);
  }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`%cServer starts on port ${PORT}`);
})
