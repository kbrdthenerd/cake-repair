import { Controller_Scene } from "../scenes/ControllerScene"

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */


export class Button extends Phaser.GameObjects.Image {
  label: Phaser.GameObjects.Text
  motivation: integer


  constructor(params) {
    super(params.scene, params.x, params.y, 'button')
    this.setDisplaySize(params.width, params.height)
    this.motivation = params.motivation
    this.initImage()
    this.initLabel(params.x - 30, params.y, params.key)
    this.scene.add.existing(this);
    this.initInput()
  }


  private initImage(): void {
    this.setOrigin(0.5, 0.5)
  }
  private initLabel(x, y, key): void {
    this.label = this.scene.add.text(x + 30, y, key, { fontFamily: 'Futura', fontSize: 30, color: '#c18cc8' })
    this.label.setOrigin(0.5, 0.5)
    this.label.depth = 10
  }

  private initInput(): void {
    const scene: Controller_Scene = this.scene as Controller_Scene
    const self = this
    this.setInteractive().on('pointerdown', pointer => {
      if (scene.airconsole.convertPlayerNumberToDeviceId(0) === scene.airconsole.getDeviceId()) {
        const coordinates = scene.icing.children.entries.map((image: Phaser.GameObjects.Image) => { return {x: image.x, y: image.y}})
        scene.airconsole.message(scene.airconsole.convertPlayerNumberToDeviceId(1), coordinates)
      } else {
        const coordinates = scene.icing.children.entries.map((image: Phaser.GameObjects.Image) => { return {x: image.x, y: image.y}})
        scene.airconsole.message(AirConsole.SCREEN, coordinates)
        scene.airconsole.message(scene.airconsole.convertPlayerNumberToDeviceId(0), coordinates)
      }
      self.label.destroy()
      self.destroy()
    })
  }

}
