/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

 /// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
import { Task } from "../objects/task"
import interaction_info from '../interaction_data/tasks'
 
export class Main_Scene extends Phaser.Scene {
  interactions: Object
  interaction_info: Object[]
  motivation: integer
  motivationText: Phaser.GameObjects.Text
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
    this.interaction_info = interaction_info
    this.airconsole = new AirConsole();
  }

  preload(): void {
    this.interaction_info.forEach(interaction => {
    // this.load.image(interaction['key'], `./src/assets/interactions/${interaction['key']}.png`)
    });
    this.load.image('placeholder', './src/assets/interactions/placeholder.png')
  }

  init(): void {
    this.motivation = 0
  }

  create(): void {
    this.motivationText = this.add.text(10, 10, `Motivation: ${this.motivation}`)
    this.motivationText.setColor('black')

    const self = this
    var timer = this.time.addEvent({
      delay: 1000,                // ms
      callback: () => {
        if (this.motivation > 0) {
          this.motivation--
        }
      },
      callbackScope: self,
      loop: true
  });
    this.interactions = this.interaction_info.map(interaction =>
      new Task(Object.assign({scene: this}, interaction))
      )
  }

  update(): void {
    this.motivationText.setText(`Motivation: ${this.motivation}`)
  }
}
