import rateLimit from 'express-rate-limit';


export let limit = ()=>{
    return rateLimit({
        windowMs:30 * 1000,
        max:10,
        standardHeaders:true,
        legacyHeaders:false,
        /* 
        skip:(req,res)=>{
        console.log(req.headers);
        if(req.headers["content-length"]>120){
            res.status(413).send({
                status:413,
                Message:"Tamaño de la solicitud alcansado"
            });
            return true;
            }
        }, */
        message:(req,res)=>{
            res.status(429).send({
                status: 429, 
                message: "Limite alcanzado"
            });
        }
    })
}