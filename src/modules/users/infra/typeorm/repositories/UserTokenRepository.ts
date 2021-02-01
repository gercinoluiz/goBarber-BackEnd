
import IUserTokensRepository from '../../../repositories/IUserTokensRepository';
import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { getRepository } from 'typeorm';



export default class UserTokenRepository implements IUserTokensRepository {

    private ormRepository: Repository<UserToken>

    constructor() {
        this.ormRepository = getRepository(UserToken)
    }


    public async findByToken(token: string): Promise<UserToken | undefined> {

        const userToken = await this.ormRepository.findOne({
            where: { token }
        })

        return userToken
    }


   public async generate (user_id: string): Promise<UserToken>{
       const UserToken = this.ormRepository.create({
           user_id
       })

       await this.ormRepository.save(UserToken)

       return UserToken

   }
}
