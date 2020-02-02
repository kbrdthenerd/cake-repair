/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import "phaser";
import { Main_Scene } from "./scenes/MainScene";
import { Scene } from "phaser";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 2000,
  height: 2000,
  type: Phaser.AUTO,
  parent: "screenGame",
  scene: [Main_Scene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 200 }
    }
  },
  backgroundColor: 0xffffff
};

// game class
export class ScreenGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.input.mouse.disableContextMenu()
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var game = new ScreenGame(config);
});
