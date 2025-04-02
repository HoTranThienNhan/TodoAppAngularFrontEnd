export class SessionStorageCheckHelper {
    static isItemFound = (item: string): boolean => {
        return JSON.parse(sessionStorage.getItem(item)!) !== null ? true : false;
    }
}
