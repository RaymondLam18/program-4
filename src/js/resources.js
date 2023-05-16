import { ImageSource, Sound, Resource, Loader } from "excalibur";
import retroImage from "../images/Retro.png";
import backImage from "../images/Background.png";

import PIdleSheet from '../assets/player/_Idle.png';
import PWalkSheet from '../assets/player/_Run.png'
import PStab from '../assets/player/_Attack.png'
import PWallSlide from '../assets/player/_WallSlide.png'
import PWallClimb from '../assets/player/_WallClimb.png'
import PWallHang from '../assets/player/_WallHang.png'
import PJump from '../assets/player/_Jump.png'

const Resources = {
  Retro: new ImageSource(retroImage),
  Back: new ImageSource(backImage),

  PIdleSheet: new ImageSource(PIdleSheet),
  PWalkSheet: new ImageSource(PWalkSheet),
  PStab: new ImageSource(PStab),
  PWallSlide: new ImageSource(PWallSlide),
  PWallClimb: new ImageSource(PWallClimb),
  PWallHang: new ImageSource(PWallHang),
  PJump: new ImageSource(PJump),
};
const ResourceLoader = new Loader([Resources.Retro, Resources.Back]);

export { Resources, ResourceLoader };

