import { IsOptional, IsString } from 'class-validator';

export class EditWorkoutDayDto {
  @IsOptional()
  @IsString()
  title?: string;
}
