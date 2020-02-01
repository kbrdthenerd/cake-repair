import { Main_Scene } from "../scenes/MainScene"

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */


export class Cake extends Phaser.GameObjects.Image {
  label: Phaser.GameObjects.Text
  motivation: integer


  constructor(params) {
    super(params.scene, 175, 200, 'cake')
    this.setDisplaySize(300, 300)
    this.initImage()
    this.scene.add.existing(this);

  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5)
  }

  public changeImageSize() {
    this.setDisplaySize(100, 100)
  }

}
