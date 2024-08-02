const CryptService = require("../Services/CryptService");
const Base = require("./BaseModel");

module.exports =
   class Password extends Base {
      value
      userId

      constructor(password, userId) {
         super();
         this.userId = userId;
         this.value = CryptService.Encrypt(password);
      }
   }