import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('company_documents') 
export class company_documents extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   companyID!: number; 

   @Column() 
   @Length(5, 1000)
   document!: string; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   @Length(5, 4000)
   description!: string; 

   @Column() 
   destination!: number; 

   @Column() 
   type!: number; 

}
