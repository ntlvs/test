import { WheelConfigType } from "./config";
import { random } from "./utils";

export interface WheelInterface {
  spin(): number
  getSpaceTypes(): number[]
}

export class Wheel implements WheelInterface {
  spaces: number[] = [];
  spacesTypes: number[] = [];

  constructor(config: WheelConfigType) {
    Object.keys(config).forEach(key => {
      const arr = new Array(config[key]).fill(Number(key));
      this.spaces.push(...arr);
      this.spacesTypes = Object.keys(config).map(e => Number(e));
    });
  }

  spin() {
    const randomNumber = random(0, this.spaces.length);
    return this.spaces[randomNumber];
  }

  getSpaceTypes(): number[] {
    return this.spacesTypes;
  }
};
