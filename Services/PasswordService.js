const Password = require("../Models/PasswordModel.js");
const CryptService = require("./CryptService.js");
const PostgreSQLConnector = require("./PostgreSQLConnector.js");

class PasswordService {
   static async Get(condition) {
      return await PostgreSQLConnector.Query(`select * from passwords where ${condition};`);
   }

   static async Create(password, userId) {
      const passwordObj = new Password(password, userId);

      await PostgreSQLConnector.Query(`
            insert into passwords (id, user_id, createAt, updateAt, value) 
            values ('${passwordObj.id}', '${passwordObj.userId}', '${passwordObj.createAt}', '${passwordObj.updateAt}', '${passwordObj.value}');`
      )

      return passwordObj;
   }

   static async Update() {

   }

   static async Delete(identificator) {
      await PostgreSQLConnector.Query(`
          delete from passwords where user_id='${identificator}'
          `
      )
   }

   static Compare(password, hash) {
      const decryptedPassword = CryptService.Decrypt(hash);

      if (password === decryptedPassword) return true;
      else return false;
   }
}

module.exports = PasswordService;