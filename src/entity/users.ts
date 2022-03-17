import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('users') 
export class users extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   ID: number; 
   
   @Column() 
   @Length(10, 100)
   username: string; 

   @Column() 
   @Length(10, 100)
   password: string; 

   @Column() 
   @Length(10, 200)
   firstname: string; 

   @Column() 
   @Length(10, 200)
   lastname: string; 
   
   @Column() 
   @Length(10, 200)
   email: string; 

}
