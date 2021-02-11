
import IParseMailDTO from '../IParseMailTemplateDTO';



export default interface IMailTemplateProvider{

    parse(data: IParseMailDTO): Promise<string>;

}
