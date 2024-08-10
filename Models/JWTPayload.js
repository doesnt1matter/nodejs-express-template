const Base = require("./BaseModel.js");
const JWT = require("jsonwebtoken");

module.exports =
   class JWTPayload extends Base {
      id
      login

      constructor(payload) {
         this.id = payload.id
         this.login = payload.login
      }

      Info() {
         console.log(this.id, this.login);
      };
   }