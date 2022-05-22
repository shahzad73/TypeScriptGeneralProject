import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";



@Entity('company_contacts') 
export class company_contacts extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   companyID!: number; 

   @Column() 
   @Length(5, 100)
   nameOfPerson!: string; 

   @Column() 
   contactTypeID!: number; 

   @Column() 
   @Length(5, 100)
   contact: string; 

}
