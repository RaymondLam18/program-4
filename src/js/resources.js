import { ImageSource, Sound, Resource, Loader } from "excalibur";
import retroImage from "./Retro.png";
import backImage from "./Background.png";

const Resources = {
  Retro: new ImageSource(retroImage),
  Back: new ImageSource(backImage),
};
const ResourceLoader = new Loader([Resources.Retro, Resources.Back]);

export { Resources, ResourceLoader };

