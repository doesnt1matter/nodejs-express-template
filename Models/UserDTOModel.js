module.exports = 
class UserDTO
{
    constructor(user)
    {
        this.id = user.id;
        this.login = user.login;
        this.email = user.email;
        this.phone = user.phone;
    }
}