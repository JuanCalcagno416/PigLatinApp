import mongoose from 'mongoose'
import config   from './config/config.json'
import app      from './config/express'

mongoose.connect(config.dbUrl, () => {

    app.listen(config.port, () => {
          
    })
    
})

mongoose.connection.on('error', function () {
    throw new Error(`unable to connect to database:` + mongoUri);
  });
