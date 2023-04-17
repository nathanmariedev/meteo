import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class City {
    constructor(city:{ insee: string, cp: string, name: string }){
        this.insee=city.insee
        this.cp=city.cp
        this.name=city.name
    }
    @Length(5)
    @ApiProperty()
    insee: string;
  
    @Length(5)
    @ApiProperty()
    cp: string;
  
    @ApiProperty()
    name: string;
  
}