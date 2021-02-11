
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailDTO from '../IParseMailTemplateDTO';




export default class FakeEmailTemplateProvider implements IMailTemplateProvider{

    public async parse({template}: IParseMailDTO): Promise<string>{
        return template
    }

}
