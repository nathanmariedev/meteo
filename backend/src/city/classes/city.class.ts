import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class City {
    @Length(5)
    @ApiProperty()
    insee: string;
  
    @Length(5)
    @ApiProperty()
    cp: string;
  
    @ApiProperty()
    name: string;
  
}