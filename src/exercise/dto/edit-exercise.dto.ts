import { IsOptional, IsString } from 'class-validator';

export class EditExerciseDto {

  @IsOptional()
  @IsString()
  title?: string;

  
}