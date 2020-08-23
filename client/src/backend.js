
 // For production use '/api'
 // While running locally, use 'http://localhost:<port_used>/api' 

 
 export const API = (process.env.NODE_ENV==="production") ? "/api" : "http://localhost:8000/api"  ; 
 

   

