import crypto from "crypto"
import fs from "fs"

export class EncrypterDecrypter {
    static path = './services/keys/aesEncrypt.key'
    static async encrypt(data) {
        const iv = crypto.randomBytes(16).toString('hex').slice(0, 16)
        let cipher = crypto.createCipheriv('aes-256-cbc', fs.readFileSync(this.path, 'utf8'), iv)
        let encrypted = iv + cipher.update(data, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        return encrypted
    }

    static async decrypt(data) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', fs.readFileSync(this.path, 'utf8'), data.slice(0, 16))
        let decrypted = decipher.update(data.slice(16), 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }

    static async encryptMultipleFields(...fields) {
        let encrypted = []

        for(let i = 0; i < fields.length; i++) {
            encrypted.push(await this.encrypt(fields[i]))
        }

        return encrypted
    }
}