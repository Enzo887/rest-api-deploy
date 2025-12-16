import cors from 'cors'

const ACCEPTED_ORIGINS = [
            'http://127.0.0.1:5500',
            'http://localhost:5500',
            'http://localhost:5501',
            'http://localhost:5502',
            'https://rest-api-deploy-w3sz.onrender.com'
        ]

export const corsMiddleware = ({ accepedOrigins = ACCEPTED_ORIGINS} = {}) =>cors({
    origin: (origin, callback)=>{
        

        if(accepedOrigins.includes(origin)){
            return callback(null, true)
        }
        if(!origin){
            return callback(null, true)
        }
        return callback(new Error('Origen no permitido'))
    }
})