/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

 /// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
 import { Task } from "../objects/task"
 import { Cake } from '../objects/cake'
 import interaction_info from '../interaction_data/tasks'
  
 export class Controller_Scene extends Phaser.Scene {
   airconsole: AirConsole
   cake: Cake
 
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
     this.load.image('icing', './src/assets/icing.png')
   }
 
   init(): void {
   }
 
   create(): void {
    new Cake({scene: this})
    this.input.on('pointermove', function (pointer) {

      if (pointer.isDown)
      {
          const temp = this.add.image(pointer.x, pointer.y, 'icing');
          temp.setDisplaySize(10, 10)
      }

  }, this);
   }
 
   update(): void {
   }
 }
 