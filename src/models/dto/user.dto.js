class userDTO {
    constructor (user){
        this.name = `${user.first_name} ${user.last_name}`.trim(); 
        this.email = user.email;
        this.role = user.role;
        this.id = user._id;
        //this.phone = user.phone;
    }
}

export default userDTO;