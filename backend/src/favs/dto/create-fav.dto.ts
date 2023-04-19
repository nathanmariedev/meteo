import { PickType } from '@nestjs/swagger';
import { FindFavs } from '../dto/find-favs.dto';

export class CreateFavsDto extends PickType(FindFavs, ['userName', 'insee']) {}
