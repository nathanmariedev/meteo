import { PickType } from '@nestjs/swagger';
import { Favs } from '../classes/favs.class';

export class CreateFavsDto extends PickType(Favs, ['insee']) {}
