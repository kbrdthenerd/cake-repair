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
   drawing: boolean
 
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
     const self = this
     this.airconsole = new AirConsole();
     this.airconsole.onConnect = () => {
      if(self.airconsole.convertPlayerNumberToDeviceId(0) === self.airconsole.getDeviceId()) {
        self.drawing = true
      }
    }
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
      self.drawing = false
      self.icing.destroy(true)
      self.icing = new Icing({scene: this})
      data.forEach(({ x, y }) => self.icing.create(x, y, 'icing'))
      self.physics.world.enable(self.icing)
      self.physics.add.collider(self.finger, self.icing, () => {
        self.icing.setVelocity(0, 0)
      })

      if(self.airconsole.convertPlayerNumberToDeviceId(0) === self.airconsole.getDeviceId()) {
        this.time.addEvent({
            delay: 100,
            callback: () => {
              const coordinates = this.icing.children.entries.map((image: Phaser.GameObjects.Image) => { return {x: image.x, y: image.y}})
              this.airconsole.message(AirConsole.SCREEN, coordinates)
            },
            callbackScope: self,
            loop: true
        })
      }
    }

    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
             self.physics.moveTo(self.finger, pointer.x, pointer.y, 200)
      } else {
          self.finger.setVelocity(0)
      }
    }, this)

    this.input.on('pointerdown', pointer => {
        self.finger.setPosition(pointer.x, pointer.y)
      })

      this.input.on('pointerup', pointer => {
        self.finger.setVelocity(0)
      })
   }
 
   update(): void {
   }
 }
 