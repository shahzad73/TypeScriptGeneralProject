import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('updates') 
export class updates extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   ID: number; 
   
   @Column() 
   TITLE: string; 

   @Column() 
   stoid: number; 

   
   @Column() 
   details: string; 

   @Column() 
   UpdateDate: string; 

}
