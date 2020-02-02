import { Controller_Scene } from "../scenes/ControllerScene"

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */


export class Answer extends Phaser.GameObjects.Image {
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
    this.label = this.scene.add.text(x, y, key)
    this.label.depth = 10
  }

  private initInput(): void {
    const scene: Controller_Scene = this.scene as Controller_Scene
    const self = this
    this.setInteractive().on('pointerdown', pointer => {
        const message = self.label.text === scene.choices[scene.answer] ? 'CORRECT!!!' : 'WRONG :('
        scene.airconsole.message(AirConsole.SCREEN, message)
        scene.option1.label.destroy()
        scene.option1.destroy()
        scene.option2.label.destroy()
        scene.option2.destroy()
        scene.option3.label.destroy()
        scene.option3.destroy()
    })
  }

}
