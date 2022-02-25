import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity() 
export class updates {   

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
