import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('updates') 
export class updates extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   ID: number; 
   
   @Column() 
   @Length(10, 200)
   TITLE: string; 


   @Column() 
   @IsInt()
   @Min(0)
   @Max(1000)   
   stoid: number; 

   
   @Column() 
   @Length(10, 200)   
   details: string; 


   @Column() 
   @IsDateString()
   UpdateDate: string; 

}
