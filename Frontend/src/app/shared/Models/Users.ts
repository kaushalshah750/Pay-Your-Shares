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
    User_id: number;
    Name: string;
    Email: string;
    Phone: number;
    Picture: string;
}