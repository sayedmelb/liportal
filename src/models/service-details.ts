export class AttributeCard {
    schema: any;
    attributeValue: string;

    constructor(schema: any, attributeValue: string) {
        this.schema = schema;
        this.attributeValue = attributeValue;
    }
}

export enum ActionType {
    None,
    Edit,
    Options,
    Links
}