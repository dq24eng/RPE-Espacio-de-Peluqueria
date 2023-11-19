class usersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async updateRole(userId, newRole) {
        return await this.dao.updateRoleDAO(userId, newRole);
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

    async deleteUser(id) {
        return await this.dao.deleteUserDAO(id);
    }
}

export default usersRepository;