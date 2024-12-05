import { IsBoolean, IsOptional, IsString } from "class-validator";


export class CreateTodoDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;
}