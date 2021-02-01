import User from "@modules/users/infra/typeorm/entities/User"
import { getRepository, Repository } from "typeorm"
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO"
import IUserRepository from "@modules/users/repositories/IUserRepository"


class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findByEmail(email: string): Promise<User | undefined> {

        const user = await this.ormRepository.findOne({ where: {email} })

        return user
    }

    public async findById(id: string): Promise<User | undefined> {

        const user = await this.ormRepository.findOne(id)

        return user
    }


    public async create(data: ICreateUserDTO): Promise<User> {

        const user = this.ormRepository.create(data)

        await this.ormRepository.save(user)

        return user
    }

    public async save(user: User): Promise<User> {

        return await this.ormRepository.save(user)
    }

}

export default UserRepository

