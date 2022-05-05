import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('user_contacts') 
export class company_contacts extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   companyID!: number; 

   @Column() 
   @Length(5, 200)
   name!: string; 

   @Column() 
   @Length(5, 50)
   phone1!: string; 

   @Column() 
   phone1Type!: number; 

   @Column() 
   @Length(5, 50)
   phone2!: string; 

   @Column() 
   phone2Type!: number; 


   @Column() 
   @Length(5, 150)
   email1!: string; 

   @Column() 
   email1Type!: number; 

   @Column() 
   @Length(5, 150)
   email2!: string; 

   @Column() 
   email2Type!: number; 

}
