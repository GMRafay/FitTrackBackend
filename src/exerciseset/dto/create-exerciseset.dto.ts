import { IsNumber, IsOptional } from 'class-validator';

export class CreateExerciseSetDto {
  @IsNumber()
  setNumber: number;
  @IsNumber()
  reps: number;

  @IsOptional()
  @IsNumber()
  weight?: number;
}
