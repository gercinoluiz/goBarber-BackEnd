import handlebars, { template } from 'handlebars'
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailDTO from '../IParseMailTemplateDTO';
import fs from 'fs';




export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider {




    public async parse({
        template, variables
    }: IParseMailDTO):Promise<string>{

        const templateFileContent = await fs.promises.readFile(template, {
            encoding:'utf-8'
        })
        const parseTemplate =  handlebars.compile(templateFileContent)

        return parseTemplate(variables)
    }


}
