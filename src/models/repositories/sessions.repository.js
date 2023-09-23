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

    async restart(email, req){
        const restartPassUser = await this.dao.restartDAO(email, req);
        return restartPassUser;
    }

    async restartPassword (email, password) {
        const resPass = await this.dao.restartPasswordDAO(email, password); 
        return resPass;
    }

}

export default SessionsRepository;