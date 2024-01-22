const fs = require("fs")
const crypto = require("crypto");

class CryptService {
    static GenerateKyes(length = 2048) 
    {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", 
        {
            modulusLength: length,
            publicKeyEncoding: { 
                type: 'spki',
                format: 'der'
            }, 
            privateKeyEncoding: { 
                type: 'pkcs8',
                format: 'der'
            }
        });

        console.log("-----BEGIN RSA PRIVATE KEY-----");
        console.log(privateKey.toString("base64"));
        console.log("-----END RSA PRIVATE KEY-----");

        console.log("-----BEGIN PUBLIC KEY-----");
        console.log(publicKey.toString("base64"));
        console.log("-----END PUBLIC KEY-----");

        return {publicKey: publicKey.toString("base64"), privateKey: privateKey.toString("base64")}
    }
    
    static Encrypt(data)
    {
        const publicKey = fs.readFileSync(`${process.cwd()}/keys/public.pem`)
        
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(data)
        );

        return encryptedData.toString("base64");
    }

    static Decrypt(data) {
        const privateKey = fs.readFileSync(`${process.cwd()}/keys/private.pem`)

        const decryptedData = crypto.privateDecrypt(
            {
              key: privateKey,
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
              oaepHash: "sha256",
            },
            Buffer.from(data, "base64")
          );
        
        return decryptedData.toString("utf-8");
    }
}

module.exports = CryptService;