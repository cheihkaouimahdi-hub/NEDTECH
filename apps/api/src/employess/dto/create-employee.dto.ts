import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Role } from '@prisma/client';

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    LastName:string;

    @IsString()
    @IsNotEmpty() 
    department:string;


    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;


    @IsIn(["Active","Inactive"])
    status:string;


    
}