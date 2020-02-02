/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

 /// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
import { Button } from "../objects/button"
import interaction_info from '../interaction_data/tasks'
import { Cake } from "../objects/cake"
import { Icing } from "../objects/icing"
 
export class Main_Scene extends Phaser.Scene {
  interactions: Object
  interaction_info: Object[]
  motivation: integer
  motivationText: Phaser.GameObjects.Text
  airconsole: AirConsole
  cake: Cake
  icing: Icing

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
    const self = this
    this.airconsole.onConnect = () => {
      console.log(self.airconsole.getDeviceId())
      self.airconsole.setActivePlayers(3)
    }
    this.airconsole.onMessage = function(from, data) {
      self.icing.destroy(true)
      self.icing = new Icing({scene: self})
      data.forEach(({ x, y }) => self.icing.create(x, y, 'icing'))
    };
  }

  preload(): void {
    this.load.image('cake', './src/assets/cake.png')
    this.load.image('icing', './src/assets/icing.png')
  }

  init(): void {
  }

  create(): void {
    this.cake = new Cake({scene: this})
    this.icing = new Icing({scene: this})
 
  }

  update(): void {
  }
}
