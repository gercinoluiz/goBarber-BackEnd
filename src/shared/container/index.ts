import {container} from "tsyringe"
import '@modules/users/providers'
import './providers'


import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"



import IUSersRepository from "@modules/users/repositories/IUserRepository"
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository"


import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '../../modules/users/infra/typeorm/repositories/UserTokenRepository';
import INotificationsRemository from '../../modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '../../modules/notifications/infra/typeorm/repositories/NotificationsRepository';



container.registerSingleton<IAppointmentsRepository>("AppointmentsRepository", AppointmentsRepository)

container.registerSingleton<IUSersRepository>("USersRepository", UserRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokenRepository)
container.registerSingleton<INotificationsRemository>('NotificationsRepository', NotificationsRepository)





