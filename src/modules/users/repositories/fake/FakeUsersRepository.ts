import User from "@modules/users/infra/typeorm/entities/User"
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO"
import IUserRepository from "@modules/users/repositories/IUserRepository"
import { uuid } from "uuidv4"
import IFindAllproviders from '../../dtos/IFindAllprovidersDTO';


class FakeUserRepository implements IUserRepository {

    private users: User[] =[]


    public async findByEmail(email: string): Promise<User | undefined> {

        const findUser = this.users.find(user => user.email === email )

        return findUser
    }

    public async findById(id: string): Promise<User | undefined> {

        const findUser = this.users.find(user => user.id === id)

        return findUser
    }


    public async create(data: ICreateUserDTO): Promise<User> {

        const user = new User();

        Object.assign(user, {id: uuid()}, data);

        this.users.push(user)

        return user
    }

    public async save(user: User): Promise<User> {

        const findIndex = this.users.findIndex(findUser => findUser.id === user.id )

        this.users[findIndex] = user

        return user
    }

    public async findlAllproviders({
        exept_user_id,
      }: IFindAllproviders): Promise<User[]> {
        let { users } = this;

        if (exept_user_id) {
          users = this.users.filter(user => user.id !== exept_user_id);
        }

        return users;
      }


}

export default FakeUserRepository

