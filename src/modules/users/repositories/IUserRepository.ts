import User from "@modules/users/infra/typeorm/entities/User"
import ICreateUserDTO from "../dtos/ICreateUserDTO"
import IFindAllproviders from '../dtos/IFindAllprovidersDTO';


interface IUserRepository {
findById(id:string):Promise<User | undefined>
findByEmail(email:string): Promise<User | undefined>
create(data: ICreateUserDTO):Promise<User>
save(user:User): Promise<User>
findlAllproviders(data:IFindAllproviders):Promise<User[]>

}

export default IUserRepository
