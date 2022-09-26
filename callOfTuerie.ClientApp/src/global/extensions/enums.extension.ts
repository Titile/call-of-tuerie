export class EnumUtility {
    static ToSelectList(typeEnum: any, fnTraduction: (item: any) => any): any[] {
        return Object.keys(typeEnum)
            .filter(value => !isNaN(Number(value)))
            .map(key => ({ value: parseInt(key), text: fnTraduction(parseInt(key)) }))
    }
}

export default EnumUtility