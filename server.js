const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database");

        const POST = config.app.port;
        app.listen(POST,() =>{
            console.log(`Server is running on port ${POST}.`);
        });
    }catch(error){
        console.log("Cannot connect to the database", error);
        process.exit();
    }
}

startServer();