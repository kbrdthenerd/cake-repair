/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

 /// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
 import { Button } from "../objects/button"
 import { Cake } from '../objects/cake'
 import { Icing } from '../objects/icing'
  
 export class Controller_Scene extends Phaser.Scene {
   airconsole: AirConsole
   cake: Cake
   icing: Icing
   button: Button
 
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
   }
 
   init(): void {
   }
 
   create(): void {
    this.cake = new Cake({scene: this})

    this.icing = new Icing({scene: this})
    this.button = new Button(Object.assign({scene: this}, { key: 'Send',
    width: 100,
    height: 50,
    x: 200,
    y: 400 }))

    const self = this
     this.airconsole.onMessage = (from, data) => {
      self.cake.changeImageSize()
    }
   }
 
   update(): void {
   }
 }
 