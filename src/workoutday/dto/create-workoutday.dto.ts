import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsObject,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';

export class CreateWorkoutDayDto {
  @IsString()
  title: string;

}
