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
    _id: string
    name: string
    description: string
    admin: Users
    members: Users[]
    created_on: string
    updated_on: string
    uId: string
}