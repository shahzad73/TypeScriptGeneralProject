import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('token_paragraphs') 
export class token_paragraphs extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   tokenID!: number; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   @Length(5, 4000)
   details!: string; 

}
