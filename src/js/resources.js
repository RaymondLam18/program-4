import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import terrainImage from '../images/Background.png'
import retro from '../images/Retro.png'
import playerProjectile from '../images/Projectile.png'
import rock from '../images/Rock.png'
import healthbars from '../images/HealthBarSpriteSheet.png'
import retrybutton from '../images/Retry.png'

const Resources = {
    Terrain: new ImageSource(terrainImage),
    Player: new ImageSource(retro),
    PlayerProjectile: new ImageSource(playerProjectile),
    Rock: new ImageSource(rock),
    HealthBars: new ImageSource(healthbars),
    RetryButton : new ImageSource(retrybutton)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)
export { Resources, ResourceLoader }