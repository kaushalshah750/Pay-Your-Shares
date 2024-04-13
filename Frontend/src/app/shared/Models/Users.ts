export interface UsersResponse{
    err: string
    errMessage: string
    data: Users[]
}

export interface UsersResponseOne{
    err: string
    errMessage: string
    data: Users
}

export interface UsersResponseString{
    err: string
    errMessage: string
    data: string
}

export interface Users {
    _id: string;
    name: string;
    email: string;
    phone: number;
    picture: string;
    uid: string
    last_login: string
}