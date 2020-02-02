import { Main_Scene } from "../scenes/MainScene"

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */


export class Icing extends Phaser.Physics.Arcade.Group {

  constructor(params) {
    super(params.scene.physics.world, params.scene, [])
  }

}
