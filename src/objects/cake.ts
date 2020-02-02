import { Main_Scene } from "../scenes/MainScene"
import { Controller_Scene } from "../scenes/ControllerScene"

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
    const scene: Controller_Scene = this.scene as Controller_Scene
        this.setInteractive().on('pointermove', (pointer) => {
      if (pointer.isDown) {
         if(scene.airconsole.convertPlayerNumberToDeviceId(0) === scene.airconsole.getDeviceId()) {
            scene.icing.create(pointer.x, pointer.y, 'icing')
         }
        }
    }, this)

  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5)
  }

  public changeImageSize() {
    this.setDisplaySize(100, 100)
  }

}
