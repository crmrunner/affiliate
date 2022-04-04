export class Affiliate {
    f_name : string;
    l_name : string;
    email: string;
    mobile_countrycode: string;
    mobile_dialCode: string;
    mobile: string;
    phone_countrycode: string;
    phone_dialCode: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    address: string;
    street: string;
    gender : string;
    accountType: string;
    routingNumber: string;
    accountNumber: string;
    nameOnAccount: string;
    bankName: string;
    echeckType: string;
    checkNumber: string;
	password: string;
    confPassword: string;
    acceptTerms: boolean;
    otp: string;

    constructor(
        f_name : string,
        l_name : string,
        email: string,
        mobile_countrycode: string,
        mobile_dialCode: string,
        mobile: string,
        phone_countrycode: string,
        phone_dialCode: string,
        phone: string,
        country: string,
        state: string,
        city: string,
        zip: string,
        street: string,
        address: string,
        gender : string,
        accountType: string,
        routingNumber: string,
        accountNumber: string,
        nameOnAccount: string,
        bankName: string,
        echeckType: string,
        checkNumber: string,
        password: string,
        confPassword: string,
        acceptTerms: boolean,
        otp: string
    ) {
        this.f_name = f_name;
        this.l_name = l_name ;
        this.email = email;
        this.mobile_countrycode = mobile_countrycode;
        this.mobile_dialCode = mobile_dialCode;
        this.mobile = mobile;
        this.phone_countrycode = phone_countrycode;
        this.phone_dialCode = phone_dialCode;
        this.phone = phone;
        this.country = country;
        this.state = state;
        this.city = city;
        this.zip = zip;
        this.street = street;
        this.address = address;
        this.gender = gender;
        this.accountType = accountType;
        this.routingNumber = routingNumber;
        this.accountNumber = accountNumber;
        this.nameOnAccount = nameOnAccount;
        this.bankName = bankName;
        this.echeckType = echeckType;
        this.checkNumber = checkNumber;
        this.password = password;
        this.confPassword = confPassword;
        this.acceptTerms = acceptTerms;
        this.otp = otp;
    }
}
