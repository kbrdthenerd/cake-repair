import { Main_Scene } from "../scenes/MainScene"
import { Controller_Scene } from "../scenes/ControllerScene"

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */


export class Finger extends Phaser.Physics.Arcade.Image {
  label: Phaser.GameObjects.Text
  motivation: integer


  constructor(params) {
    super(params.scene, 0, 0, 'icing')
    this.initImage()
    this.scene.physics.add.existing(this)
    this.setImmovable()
    this.setCollideWorldBounds(true)
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5)
  }

}
