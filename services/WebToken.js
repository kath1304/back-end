import jwt from "jsonwebtoken";
import fs from "fs";

class WebToken {
    jwt
    privateKey
    publicKey
    constructor(){
        this.jwt = jwt
        //KEYS
        this.privateKey = fs.readFileSync('./services/keys/private.key', 'utf8')
        this.publicKey = fs.readFileSync('./services/keys/public.key', 'utf8')
    }
    generate(username, role){
        //PAYLOAD
        let data = {
            username: username,
            role: role,
        }
        //OPTIONS
        let options = {
            expiresIn: "1h",
            algorithm: "RS256",
        }
        try {
            return this.jwt.sign(data, this.privateKey, options)
        } catch(err) {
            console.error("Token generation procedure unsuccessful")
            return null
        }
    }
    validate(token){
        let verifyOptions = {
            expiresIn: "1h",
            algorithm: ["RS256"],
        }
        try {
            return this.jwt.verify(token, this.publicKey, verifyOptions)
        } catch(err) {
            console.error("Invalid token")
            return null
        }
    }
}

export {WebToken}