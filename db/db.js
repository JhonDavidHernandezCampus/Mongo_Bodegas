import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export async function conx(){
    try {
        const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@dbcampusbodegas.stvfqug.mongodb.net/${process.env.NAMEDATABASE}`;
        // * console.log(uri);
        const option = {
            useNewUrlParser:true,
            useUnifiedTopology:true
        };
        const conx = await MongoClient.connect(uri,option);
        return conx.db();
    } catch (error) {
        return {status:500, message:error};
    }
}
