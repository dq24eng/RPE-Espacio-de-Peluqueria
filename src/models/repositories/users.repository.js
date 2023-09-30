class usersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async updateRole(user) {
        return await this.dao.updateRoleDAO(user);
    }
}

export default usersRepository;