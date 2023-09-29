export interface SignupUser{
       id: number;
       fullName: string;
       email: string;
       password: string;
       phone: string;
       city: string;
       expoToken?: string;
       imageProfile?: string;
       isAdmin?: boolean;
       isOnline?: boolean;
       memberShip: string;
}

export enum Status {
       BASIC = 'BASIC',
       PREMIUM= 'PREMIUM',
       BUSINESS= 'BUSINESS',
}