import { IUser } from "./user.interface";
export interface IRegister {
    _id?: string;
    name: string;
    city: string;
    //registerDate: Date;
    users: IUser[];
}