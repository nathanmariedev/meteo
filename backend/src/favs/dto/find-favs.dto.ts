import { PickType } from '@nestjs/mapped-types';
import { User } from './../../user/classes/user.class';
import { City } from './../../city/classes/city.class';
import { IntersectionType } from '@nestjs/swagger';

export class FindUserDto extends PickType(User, ['userName', 'password', 'mainCity']) {
  // You can add any additional properties or methods here
}

export class FindFavs extends IntersectionType(FindUserDto, City) {}
