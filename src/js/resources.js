import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Background } from './background'

// voeg hier jouw eigen resources toe
// Enemy, Background en Player resources nog toevoegen.

const Resources = {
    // Player Resources
    Fish: new ImageSource('images/fish.png'),
    Rock: new ImageSource('images/brokstuk.png'),
    Platform: new ImageSource('images/ground.png'),
    Duck: new ImageSource('images/eend.png'),
    Mast1: new ImageSource('images/Background1.png'),
    Mast2: new ImageSource('images/Background2.png'),
    Mast3: new ImageSource('images/Background3.png'),
    Cloud: new ImageSource('images/cloudd.png'),
    KnockBack:new Sound('images/knockback.mp3')
    //Enemy Resources

    //Background Resources
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }