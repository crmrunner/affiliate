export class UserModel {
    username : string;
    password : string;
    confPassword: string;
    currentPassword: string;
    constructor(
        username : string,
        password : string,
        confPassword: string,
        currentPassword: string
    ) {
        this.username = username;
        this.currentPassword = currentPassword;
        this.password = password;
        this.confPassword = confPassword;

    }
}
