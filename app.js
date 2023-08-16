import dotenv from 'dotenv';
import express  from 'express';
import routes from './routes/routes.js';
 
dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(express.text());

appExpress.use('/', routes);

let config = JSON.parse(process.env.MY_CONFIG);

appExpress.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
}); 