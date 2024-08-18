const IDService = require("../Services/IDService.js");
const DateService = require("../Services/DateService.js")

module.exports =
    class Base {
        id;
        createAt;
        updateAt;

        constructor() {
            this.id = IDService.GenerateID();
            this.createAt = DateService.Now().timestamp;
            this.updateAt = this.createAt;
        }
    }