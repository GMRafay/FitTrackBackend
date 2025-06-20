import { Type } from "class-transformer";
import { IsArray, IsString, Validate, ValidateNested} from "class-validator";
import { CreateExerciseSetDto } from "../../exerciseset/dto/create-exerciseset.dto";
export class CreateExerciseDto{

    @IsString()
    title: string;

}