const IDService = require("../Services/IDService.js");
const DateService = require("../Services/DateService.js")

module.exports = 
class Base 
{
    id;
    createDate;
    updateDate;

    constructor() 
    {
        this.id = IDService.GenerateID();
        this.createDate = DateService.Now();
        this.updateDate = this.createDate;
    }
}