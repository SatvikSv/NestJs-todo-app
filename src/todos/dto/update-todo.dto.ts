import { IsBoolean, IsOptional, IsString } from "class-validator";


export class UpdateTodoDto{
    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;
}