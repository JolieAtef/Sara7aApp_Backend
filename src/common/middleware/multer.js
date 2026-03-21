import multer from "multer";
import ImageKit from "imagekit";
import { env } from "../../../config/env.service.js";

//>>>>  diskStorage

// export const upload=(file)=>{
//     const storage = multer.diskStorage(
//         {
//             destination:function(req ,file , cb){
//                 cb(null , "uploads")
//             },
//             filename:function(req , file , cb){
//                 cb(null , Date.now() + "-" + file.originalname)
//             }
//         }
//     )
//     const upload = multer({storage : storage})
//     return upload
// }





//>>>> memory storage

const storage = multer.memoryStorage();
export const upload = multer({ storage });



//imageKit storage

export const imagekit = new ImageKit({
  publicKey:env.privateKey,
  privateKey:env.privateKey,
  urlEndpoint:env.urlEndpoint,
});

