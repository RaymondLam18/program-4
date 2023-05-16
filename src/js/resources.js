import { ImageSource, Sound, Resource, Loader } from "excalibur";
import retroImage from "../images/Retro.png";
import backImage from "../images/Background.png";

import PIdleSheet from '../assets/_Idle.png';
import PWalkSheet from '../assets/_Run.png'
import PStab from '../assets/_Attack.png'
import PWallSlide from '../assets/_WallSlide.png'
import PWallClimb from '../assets/_WallClimb.png'
import PJump from '../assets/_Jump.png'

const Resources = {
  Retro: new ImageSource(retroImage),
  Back: new ImageSource(backImage),

  PIdleSheet: new ImageSource(PIdleSheet),
  PWalkSheet: new ImageSource(PWalkSheet),
  PStab: new ImageSource(PStab),
  PWallSlide: new ImageSource(PWallSlide),
  PWallClimb: new ImageSource(PWallClimb),
  PJump: new ImageSource(PJump),
};
const ResourceLoader = new Loader([Resources.Retro, Resources.Back]);

export { Resources, ResourceLoader };

