import {container} from 'tsyringe'
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider'
import IStorageProvider from './StorageProviders/models/IStorageProvider'
import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailProvider';

import "./CaheProvider"

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider)
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider)
container.registerInstance<IMailProvider>('MailProvider', container.resolve( EtherealMailProvider)) // I do different here because I am using it in a constructor TODO: See other ways
