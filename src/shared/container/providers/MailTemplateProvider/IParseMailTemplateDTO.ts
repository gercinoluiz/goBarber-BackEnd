interface ITemplateVariables{

    [key:string]: string

}


export default interface IParseMailDTO {

    template: string,
    variables: ITemplateVariables

}
