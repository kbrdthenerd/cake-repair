/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

 /// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
 import { Button } from "../objects/button"
 import { Cake } from '../objects/cake'
 import { Icing } from '../objects/icing'
 import { Finger } from '../objects/finger'
  
 export class Controller_Scene extends Phaser.Scene {
   airconsole: AirConsole
   cake: Cake
   icing: Icing
   button: Button
   finger: Finger
 
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
     this.load.image('button', './src/assets/interactions/placeholder.png')
     this.load.image('finger', './src/assets/icing.png')
   }
 
   init(): void {
   }
 
   create(): void {
    this.cake = new Cake({scene: this})
    this.icing = new Icing({scene: this})
    this.finger = new Finger({scene: this})
    this.button = new Button(Object.assign({scene: this}, { key: 'Send',
    width: 100,
    height: 50,
    x: 200,
    y: 400 }))
    const self = this
     this.airconsole.onMessage = (from, data) => {
      data.forEach(({ x, y }) => self.icing.create(x, y, 'icing'))
      self.physics.world.enable(self.icing)
      self.physics.add.collider(self.finger, self.icing)
    }
   }
 
   update(): void {
   }
 }
 