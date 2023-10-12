const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

//const url = `mongodb+srv://asdfrajkumar1122:UIfvIeGADP7LG5yD@cluster0.mongodb.net//Demo?retryWrites=true&w=majority`;

const url = `mongodb+srv://asdfrajkumar1122:UIfvIeGADP7LG5yD@cluster0.1tprpsp.mongodb.net/Demo?retryWrites=true&w=majority`;


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

    const db = mongoose.connection;

    module.exports = db;