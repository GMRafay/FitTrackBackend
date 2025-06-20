import { IsString } from 'class-validator';

export class EditWorkoutDayDto {
  @IsString()
  title?: string;
}
