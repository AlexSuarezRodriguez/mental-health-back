const mongoose = require('mongoose');
const URI = process.env.MONGO_DB_URI;

async function conectDb () {
    try{await mongoose.connect(URI)
    console.log("Confirmación  conexión db")}
    catch(error){
        console.error(error)
        process.exit(1)
    }

}

module.exports = conectDb