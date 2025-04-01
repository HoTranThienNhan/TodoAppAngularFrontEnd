export class ObjectCompareHelper {
    static isObject = (object: any): boolean => {
        return object != null && typeof object === "object";
    };
    
    static isDeepEqual = (obj1: any, obj2: any): boolean => {
        let objKeys1: string[] = Object.keys(obj1);
        let objKeys2: string[] = Object.keys(obj2);
    
        if (objKeys1.length !== objKeys2.length) {
            return false;
        }
    
        for (let key of objKeys1) {
            const value1: any = obj1[key];
            const value2: any = obj2[key];
    
            const isObjects = this.isObject(value1) && this.isObject(value2);
    
            if ((isObjects && !this.isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
                return false;
            }
        }
        
        return true;
    }
}