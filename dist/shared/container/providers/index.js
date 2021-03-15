"use strict";

var _tsyringe = require("tsyringe");

var _DiskStorageProvider = _interopRequireDefault(require("./StorageProviders/implementations/DiskStorageProvider"));

var _EtherealMailProvider = _interopRequireDefault(require("./MailProvider/implementations/EtherealMailProvider"));

var _HandlebarsMailProvider = _interopRequireDefault(require("./MailTemplateProvider/implementations/HandlebarsMailProvider"));

require("./CaheProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('StorageProvider', _DiskStorageProvider.default);

_tsyringe.container.registerSingleton('MailTemplateProvider', _HandlebarsMailProvider.default);

_tsyringe.container.registerInstance('MailProvider', _tsyringe.container.resolve(_EtherealMailProvider.default)); // I do different here because I am using it in a constructor TODO: See other ways