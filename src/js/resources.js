import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import backImage from '../images/Background.png'
import retro from '../images/Retro.png'
import retroDead from '../images/Retro Dead.png'
import playerProjectile from '../images/Projectile.png'
import rock from '../images/Rock.png'
import healthbars from '../images/HealthBarSpriteSheet.png'
import retrybutton from '../images/Retry.png'
import startbutton from '../images/Start.png'
import space from '../images/Space.jpg'

const Resources = {
    Back: new ImageSource(backImage),
    Player: new ImageSource(retro),
    PlayerProjectile: new ImageSource(playerProjectile),
    Rock: new ImageSource(rock),
    HealthBars: new ImageSource(healthbars),
    RetryButton : new ImageSource(retrybutton),
    StartButton : new ImageSource (startbutton),
    Space : new ImageSource (space),
    DeathAnimation: new ImageSource (retroDead)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)
export { Resources, ResourceLoader }