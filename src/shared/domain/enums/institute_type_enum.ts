export enum INSTITUTE_TYPE {
    TYPE_1 = "type_1",
    TYPE_2 = "type_2"
}

export function toEnum(value: string): INSTITUTE_TYPE {
    switch(value) {
        case "type_1":
            return INSTITUTE_TYPE.TYPE_1;
        case "type_2":
            return INSTITUTE_TYPE.TYPE_2;
        default:
            throw new Error("Invalid institute type");
    }
}