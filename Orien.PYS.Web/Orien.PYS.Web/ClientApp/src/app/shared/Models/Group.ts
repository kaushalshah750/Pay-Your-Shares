import { Users } from "./Users"

export interface Group{
    id:number
    name:string
    description:string
    admin: Users
    members: Users[]
    created_on: string
    updated_on: string
    uId: string
}