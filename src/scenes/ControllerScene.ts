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
 import { Answer } from '../objects/answer'
  
 export class Controller_Scene extends Phaser.Scene {
   airconsole: AirConsole
   cake: Cake
   icing: Icing
   button: Button
   finger: Finger
   drawing: boolean
   interact: boolean
   option1: Answer
   option2: Answer
   option3: Answer
   answer: integer
   label: Phaser.GameObjects.Text
   choices: [string, string, string, string, string] = [
    'Circle',
    'Square',
    'Eight',
    'Triangle',
    'Star',
  ]
 
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

    const self = this
    this.airconsole = new AirConsole();
    this.airconsole.onConnect = () => {
     if(self.airconsole.convertPlayerNumberToDeviceId(0) === self.airconsole.getDeviceId()) {
       self.drawing = true
       self.answer = this.getRandomInt(self.choices.length)
       if (self.label) {
         self.label.destroy()
       }
       self.label = self.add.text(100, 500, self.choices[self.answer], { size: 200 })
       self.label.setColor('000000')
       self.makeInteractive()
     } else if (self.airconsole.convertPlayerNumberToDeviceId(1) === self.airconsole.getDeviceId()) {
       self.makeInteractive()
     } else {
      self.airconsole.onMessage = (from, data) => {
        self.answer = data
        self.createOptions(data)
      }
     }
   }
   }

 
   update(): void {
   }

   private createOptions(answer: integer): void {
     const correct = this.choices[answer]
     const options = this.choices.slice(answer + 1, this.choices.length).concat(this.choices.slice(0, answer))
     const one = options.splice(this.getRandomInt(options.length), 1)[0]
     const two = options.splice(this.getRandomInt(options.length), 1)[0]

     console.log(one)
     console.log(two)
     const finalChoices = [one, two, correct]

    this.option1 = new Answer(Object.assign({scene: this}, { key: finalChoices.splice(this.getRandomInt(finalChoices.length), 1),
    width: 100,
    height: 50,
    x: 200,
    y: 100 }))
   this.option2 = new Answer(Object.assign({scene: this}, { key: finalChoices.splice(this.getRandomInt(finalChoices.length), 1),
   width: 100,
   height: 50,
   x: 200,
   y:  300}))
  this.option3 = new Answer(Object.assign({scene: this}, { key: finalChoices[0],
  width: 100,
  height: 50,
  x: 200,
  y: 500 }))

   }

   private getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

   private makeInteractive(): void {
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
        this.airconsole.message(self.airconsole.convertPlayerNumberToDeviceId(2), self.answer)
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
 }
