import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import terrainImage from '../images/Background.png'
import retro from '../images/Retro.png'
import playerProjectile from '../images/TestProjectilev2.png'
import enemyProjectile from '../images/Rock.png'
import healthbars from '../images/HealthBarSpriteSheet.png'
import retrybutton from '../images/retrybutton.png'

const Resources = {
    Terrain: new ImageSource(terrainImage),
    Player: new ImageSource(retro),
    PlayerProjectile: new ImageSource(playerProjectile),
    EnemyProjectile: new ImageSource(enemyProjectile),
    HealthBars: new ImageSource(healthbars),
    RetryButton : new ImageSource(retrybutton)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)
export { Resources, ResourceLoader }