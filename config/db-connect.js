const mongoose  = require("mongoose");

async function dbConnection(){
    try {
        let result = await mongoose.connect(process.env.MONGO_URI);
        if(result){
            console.log(`Database connection is establish`)
        }else{
            throw Error('Database connections fails try again')
        }

    } catch (error) {
        console.log(error.stack);
        console.log(error.message);
        
    }
}

module.exports = dbConnection;