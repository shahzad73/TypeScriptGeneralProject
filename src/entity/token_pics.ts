import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('token_pics') 
export class token_pics extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   tokenID!: number; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   @Length(5, 1000)
   image!: string; 

   @Column() 
   @Length(5, 4000)
   description!: string; 

}