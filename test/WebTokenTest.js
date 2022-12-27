import {WebToken} from '../services/WebToken.js'
let webToken = new WebToken()
let result
const testGenerateToken = () => {
   result = webToken.generate(9)
   console.log("test " + result)
}
const testValidateToken = () => {
   console.log(webToken.validate(result))
}
const testValidateTokenWrong = () => {
   console.log(webToken.validate(10))
}


const main = () => {
   testGenerateToken()
   testValidateToken()
   testValidateTokenWrong()
}

main()

