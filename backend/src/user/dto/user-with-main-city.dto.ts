import { ApiProperty } from '@nestjs/swagger';
import { City } from './../../city/classes/city.class';

export class UserWithMainCity {
  constructor(user: { userName: string; password: string; mainCity: City }) {
    this.userName = user.userName;
    this.password = user.password;
    this.mainCity = user.mainCity;
  }

  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: () => City })
  mainCity: City;
}
