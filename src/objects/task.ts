import { Main_Scene } from "../scenes/MainScene"

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */


export class Task extends Phaser.GameObjects.Image {
  label: Phaser.GameObjects.Text
  motivation: integer


  constructor(params) {
    super(params.scene, params.x, params.y, 'placeholder')
    this.setDisplaySize(params.width, params.height)
    this.motivation = params.motivation
    this.initInput()
    this.initImage()
    this.initLabel(params.x - 30, params.y, params.key)
    this.scene.add.existing(this);

  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5)
  }
  private initLabel(x, y, key): void {
    this.label = this.scene.add.text(x, y, key)
    this.label.depth = 10
  }

  private initInput(): void {
    const scene: Main_Scene = this.scene as Main_Scene
    this.setInteractive().on('pointerup', pointer => {
      scene.motivation += this.motivation
      scene.airconsole.message(AirConsole.SCREEN, "How are you?");
      console.log(scene.motivation)
    })
  }

}
