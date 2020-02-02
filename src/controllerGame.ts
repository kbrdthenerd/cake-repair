/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import "phaser";
import { Controller_Scene } from "./scenes/ControllerScene";
import { Scene } from "phaser";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 600,
  height: 600,
  type: Phaser.AUTO,
  parent: "controllerGame",
  scene: [Controller_Scene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  backgroundColor: 0xe9e7fb
};

// game class
export class ControllerGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.input.mouse.disableContextMenu()
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var controllerGame = new ControllerGame(config);
});
