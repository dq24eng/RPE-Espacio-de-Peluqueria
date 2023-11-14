class usersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async updateRole(user) {
        return await this.dao.updateRoleDAO(user);
    }

    async getUsers () {
        return await this.dao.getUsersDAO(); 
    }

    async createUser (user) {
        return await this.dao.createUsersDAO(user); 
    }

    async getFullUsers() {
        return await this.dao.getFullUsersDAO(); 
    }

    async delExpUsers(users){
        return await this.dao.delExpUsersDAO(users); 
    }
}

export default usersRepository;