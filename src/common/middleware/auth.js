import jwt from "jsonwebtoken"

export const generateToken=(user)=>{
    let signature =""
    switch(user.role){
        case "user":
            signature="s_u";
            break;
        
        case "admin":
            signature="s_a";
            break;

        default:
            break;
    }

    let accessToken = jwt.sign({id: user._id}, signature , {expiresIn:"30m"})
    let refreshToken = jwt.sign({id: user._id}, signature , {expiresIn:"1y"})
    return {accessToken , refreshToken}
}


export const auth = (req ,res , next)=>{
    let{authorization} = req.headers
    let [ bearer , token]= authorization.split(" ")
    let signature =""
    switch(bearer){
        case "User":
            signature="s_u";
            break;
        
        case "Admin":
            signature="s_a";
            break;

        default:
            res.json({message:"role is invalid"})
    }
    
    let decode = jwt.verify(token , signature)
    req.user = decode
    next()
}