import userDTO from "../dto/user.dto.js"; 

class SessionsRepository {
    constructor(dao) {
		this.dao = dao;
	}

    async login(email){
        return await this.dao.loginDAO(email);
    }

    async current(sessionUser){
        const userData = await this.dao.currentDAO(sessionUser.email);
        const currentUser = new userDTO (userData);
        return currentUser;
    }

}

export default SessionsRepository;