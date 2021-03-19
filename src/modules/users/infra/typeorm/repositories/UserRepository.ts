import User from "@modules/users/infra/typeorm/entities/User"
import { getRepository, Not, Repository } from "typeorm"
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO"
import IUserRepository from "@modules/users/repositories/IUserRepository"
import IFindAllproviders from '../../../dtos/IFindAllprovidersDTO';
import { th } from 'date-fns/locale';
import AppError from '../../../../../shared/errors/AppError';


class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findByEmail(email: string): Promise<User | undefined> {

        const user = await this.ormRepository.findOne({ where: { email } })

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

    public async findlAllproviders({ exept_user_id }: IFindAllproviders): Promise<User[]> {

        let users: User[];

        if (exept_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(exept_user_id),
                    isProvider: true
                }
            })
        } else {
            users = await this.ormRepository.find()
        }


        return users


    }

}

export default UserRepository

