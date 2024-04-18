import { Users } from "./Users"

export interface GroupResponse{
    err: boolean;
    errMessage: string;
    data: Group[]
}

export interface GroupResponseOne{
    err: boolean;
    errMessage: string;
    data: Group
}

export interface GroupAddResponseOne{
    err: boolean;
    errMessage: string;
    data: string
}

export interface Group{
    Group_id: number
    Name: string
    Description: string
    Admin: Users
    Members: Users[]
    Created_on: string
    Updated_on: string
}