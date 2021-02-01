import { container } from "tsyringe";
import BCryptHashProvider from "./HashProviders/implementations/BcryptProvider";
import IHashProvider from "./HashProviders/models/IHashProvider";

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
