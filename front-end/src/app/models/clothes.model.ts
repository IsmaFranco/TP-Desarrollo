export interface Cloth {
    idCl:       number;
    nameCl:       string;
    description:string;
    size:       string;
    typeCl:     string;
    stock:      number;
    price:      number;
    image:      string;
    purchase:   Purchase;
    user:       User;
}

export interface Purchase {
    idPur: number;
    date:  Date;
    user:  User;
}

export interface User {
    idUs:      number;
    nameUs:    string;
    lastNameUs:string;
    emailUs:   string;
    dni:       string;
    phoneUs:   string;
    addressUs: string;
    postalCode:string;
    role:      string;
}
