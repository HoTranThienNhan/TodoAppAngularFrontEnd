export class User {
    id!: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    isActive: boolean;
    avatar: string;

    constructor(id: string, firstName: string, lastName: string = "", username: string, email: string, phone: string, isActive: boolean, avatar: string = "") {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.isActive = isActive;
        this.avatar = avatar;
    }
}
