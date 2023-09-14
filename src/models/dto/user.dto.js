class userDTO {
    constructor (user){
        this.name = `${user.first_name} ${user.last_name}`.trim(); 
        this.email = user.email;
        this.role = user.role;
        this.phone = user.phone;
    }
}

export default userDTO;