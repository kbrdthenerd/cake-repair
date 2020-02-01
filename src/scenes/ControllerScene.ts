/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

 /// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
 import { Task } from "../objects/task"
 import interaction_info from '../interaction_data/tasks'
  
 export class Controller_Scene extends Phaser.Scene {
   airconsole: AirConsole
 
   constructor() {
     super({
       key: 'Scene',
       physics: {
         arcade: {
           gravity: {
             x: 0,
             y: 0
           }
         }
       }
     })
     this.airconsole = new AirConsole();
   }
 
   preload(): void {
    
     this.load.image('cake', './src/assets/cake.png')
   }
 
   init(): void {
   }
 
   create(): void {
   }
 
   update(): void {
   }
 }
 