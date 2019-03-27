import { Bullet } from "../gameObjects/Projectiles";

export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,healthPoints = 100){
        super(scene,x,y,key,textureName);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.setOrigin(0,0);
        this.nonZeroVelocity = {x:0,y:1};

        //enables body in the phsyics world in the game
        scene.physics.world.enableBody(this);
        this.createWeapon(scene);

        //Create intial Healthpoints for the player
        this.healthPoints = healthPoints;

        scene.input.on('pointerdown',()=>{ //pointerdown event handler
            this.attack();
        });
    }

    createWeapon(scene){
        let bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.attack = ()=>{
            let bullet = bullets.get();
            scene.children.add(bullet);
            bullet.shoot(this,scene.input.x,scene.input.y);
          };

    }

}