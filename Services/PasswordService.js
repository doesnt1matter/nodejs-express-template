const Password = require("../Models/PasswordModel.js");
const CryptService = require("./CryptService.js");
const PostgreSQLConnector = require("./PostgreSQLConnector.js");

class PasswordService {
   static async Get(condition) {
      return await PostgreSQLConnector.Query(`select * from passwords where ${condition};`);
   }

   static async Create(password, userId) {
      const passwordObj = new Password(password, userId);

      return await PostgreSQLConnector.Query(`
            insert into passwords (id, user_id, createAt, updateAt, value) 
            values ('${passwordObj.id}', '${passwordObj.userId}', '${passwordObj.createAt}', '${passwordObj.updateAt}', '${passwordObj.value}');`
      )
   }

   static async Update() {

   }

   static Compare(password, hash) {
      const decryptedPassword = CryptService.Decrypt(hash);

      if (password === decryptedPassword) return true;
      else return false;
   }
}

module.exports = PasswordService;