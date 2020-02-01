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
    this.cake = new Cake({scene: this})

    const self = this
     this.airconsole.onMessage = function(from, data) {
      console.log(AirConsole.SCREEN)
      console.log(self.airconsole.getDeviceId())
      self.cake.changeImageSize()
      console.log('Doing this thing')
    };
    this.input.on('pointermove', function (pointer) {

      if (pointer.isDown)
      {
          const temp = this.add.image(pointer.x, pointer.y, 'icing');
          temp.setDisplaySize(10, 10)
          this.airconsole.message(AirConsole.SCREEN, 'THING')
          this.airconsole.message(this.airconsole.convertPlayerNumberToDeviceId(1), 'that message')
      }

  }, this);
   }
 
   update(): void {
   }
 }
 