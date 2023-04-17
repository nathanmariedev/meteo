import { ApiProperty } from "@nestjs/swagger";
import { City } from "./../../city/classes/city.class";
import { use } from "passport";

export class UserWithMainCity {
    constructor(user:{ userId: number, userName: string, password: string, mainCity:City }){
        this.userId=user.userId
        this.userName=user.userName
        this.password=user.password
        this.mainCity=user.mainCity
    }
    @ApiProperty()
    userId:number

    @ApiProperty()
    userName:string

    @ApiProperty()
    password:string

    @ApiProperty({type : () => City})
    mainCity:City

}