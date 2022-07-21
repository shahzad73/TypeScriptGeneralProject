import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('token_docs') 
export class token_docs extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   tokenID!: number; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   @Length(5, 1000)
   document!: string; 

   @Column() 
   @Length(5, 4000)
   description!: string; 

}
