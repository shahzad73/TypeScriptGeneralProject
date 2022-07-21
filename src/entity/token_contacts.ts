import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('token_contacts') 
export class token_contacts extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   tokenID!: number; 

   @Column() 
   contactTypeID!: number; 

   @Column() 
   @Length(5, 100)
   contact!: string; 

   @Column() 
   @Length(5, 100)
   nameOfPerson!: string; 

}