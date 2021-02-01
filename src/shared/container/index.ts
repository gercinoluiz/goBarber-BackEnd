import {container} from "tsyringe"

import IUSersRepository from "@modules/users/repositories/IUserRepository"
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository"
import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '../../modules/users/infra/typeorm/repositories/UserTokenRepository';

import "@modules/users/providers"


import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"
import './providers'

container.registerSingleton<IAppointmentsRepository>("AppointmentsRepository", AppointmentsRepository)

container.registerSingleton<IUSersRepository>("USersRepository", UserRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokenRepository)





