/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

 /// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
import { Cake } from "../objects/cake"
import { Icing } from "../objects/icing"
 
export class Main_Scene extends Phaser.Scene {
  airconsole: AirConsole
  cake: Cake
  icing: Icing
  label: Phaser.GameObjects.Text

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
    this.airconsole = new AirConsole()
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
    this.add.text(400, 100, 'Cake Confusion', { fontFamily: 'Futura', fontSize: 100, color: '#c18cc8' })
    this.add.text(410, 250, 'by Katherine Brennan', { fontFamily: 'Futura', fontSize: 50, color: '#c18cc8' })

    const self = this
    this.airconsole.onConnect = () => {
      console.log(self.airconsole.getDeviceId())
      self.airconsole.setActivePlayers(3)
    }
    this.airconsole.onMessage = function(from, data) {
      if(self.airconsole.convertPlayerNumberToDeviceId(2) === from) {
        self.label = self.add.text(100, 400, data, { fontFamily: 'Futura', fontSize: 100, color: '#c18cc8' })
      } else {
      self.icing.destroy(true)
      self.icing = new Icing({scene: self})
      data.forEach(({ x, y }) => self.icing.create(x, y, 'icing'))
      }
    }
  }

  update(): void {
  }
}
