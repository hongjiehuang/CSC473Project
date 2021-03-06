import Phaser from 'phaser';

/**
 * Class that generate a empty backing status bar on the screen, thus we can make
 * the status bars in the game to have the cutting or reducing effect by cropping the
 * front bar.
 */
export class emptyBar extends Phaser.GameObjects.Image{

    /**
     * Generate and display an empty bar on the game screen with giving x and y value
     * @param {phaser.Scene} scene - the phaser scene which the instance of this class will appears on
     * @param {Number} x - the x position value on the game screen
     * @param {Number} y - the y position value on the game screen
     */
    constructor(scene,x,y){
        super(scene,x,y, 'bar');

        //add the empty bar to the display list
        scene.sys.displayList.add(this);

        this.setVisible(true);
    }
}

/**
 * Class that generates and displays a front red bar which will be representing the health point of the
 * character
 */
export class HpBar extends Phaser.GameObjects.Image{
    
    /**
     * Generates and displays the front hp bar on the screen with giving x and y value, and assign health point value
     * and unique ID for it
     * @param {phaser.Scene} scene - the phaser scene which the instance of this class will appears on
     * @param {Number} x - the x position value on the game screen
     * @param {Number} y - the y position value on the game screen
     * @param {String} type - type of the bar either hp or mana
     * @param {Number} value - value of this bar, default 500
     * @param {String} uid - the associated uid of this bar
     */
    constructor(scene,x,y, type='HP', value=500, uid){
        super(scene,x,y, 'playerhpbar');

        //add the hp bar to the display list
        scene.sys.displayList.add(this);

        /**
         * a string that represents the type of the bar, default will be 'HP'
         * @name HpBar#type
         * @type String
         */
        this.type = type;

        /**
         * the unique ID associated with this bar
         * @name HpBar#uid
         * @type String
         */
        this.uid = uid;

        /**
         * the value of this bar
         * @name HpBar#value
         * @type Number
         */
        this.value = value;

        /**
         * The current health point value, this will keep track the value changes
         * @name HpBar#currentHP
         * @type Number
         */
        this.currentHP = this.value;

        this.setVisible(true);
        //this.setPosition(0,0);

        /**
         * The current width value of this bar, this will be helpful to display the cutting effect
         * @name HpBar#cutWith
         * @type Number
         */
        this.cutWith = this.width;

      //  this.emptybar3 = new emptyBar(scene,x,y).setDepth(-1);
    }

    /**
     * Method that use to display the cropping effect of this bar, the bar will be cut based on the
     * damage that the character taked.
     * @param {Number} damage - the damage character is taking
     */
    cutHPBar(damage){
        //cut the bar to display reducing effect

        let ratio = damage / this.currentHP;

        this.cutWith = this.cutWith-(this.cutWith * ratio);
        this.setCrop(0,0,this.cutWith,this.height);

        this.currentHP = this.currentHP - damage;

    }

    /**
     * Method that used to display the regeneration effect of HP bar, the width of this bar will be 
     * adjust based on the regenAmount it takes in
     * @param {Number} regenAmount - the regenerating value the character received
     */
    regenHPBar(regenAmount){
        // regenrate HP bar to display HP regenration effect
        if(this.currentHP !== this.value){
            let recoverate = regenAmount / this.value;

            this.cutWith = this.cutWith + (this.width * recoverate);
            this.setCrop(0,0,this.cutWith,this.height);

            this.currentHP = this.currentHP + regenAmount;
        }
        else{
            console.log('Full HP!');
        }
    }

    /**
     * Method that resets to the bar to its state at creation
     */
    resetBar(){
        this.cutWith = this.width;
        this.currentHP = this.value;
        this.setCrop(0,0,this.width,this.height);
    }
}

/**
 * Class that generates and displays a front blue bar which will be representing the mana point of the
 * character
 */
export class ManaBar extends Phaser.GameObjects.Image{
    /**
     * Generates and displays the front mana bar on the screen with giving x and y value, and assign health point value
     * and unique ID for it
     * @param {phaser.Scene} scene - the phaser scene which the instance of this class will appears on
     * @param {Number} x - the x position value on the game screen
     * @param {Number} y - the y position value on the game screen
     * @param {String} type - type of the bar either hp or mana
     * @param {Number} value - value of this bar, default 1000
     * @param {String} uid - the associated uid of this bar
     */
    constructor(scene,x,y, type='Mana', value=1000, uid){
        super(scene,x,y, 'playermanabar');

        //add the hp bar to the display list
        scene.sys.displayList.add(this);

        /**
         * The type of this bar
         * @name ManaBar#type
         * @type String
         */
        this.type = type;

        /**
         * The unique ID of this bar
         * @name ManaBar#uid
         * @type String
         */
        this.uid = uid;

        /**
         * The total value of this bar
         * @name ManaBar#value
         * @type Number
         */
        this.value = value;

        /**
         * The current mana value, this will keep track the mana value changes
         * @name ManaBar#currentMana
         * @type Number
         */
        this.currentMana = this.value;

        this.setVisible(true);
        //this.setPosition(0,0);

        /**
         * The current width value of this bar, this will be helpful to display the cutting effect
         * @name ManaBar#cutWith
         * @type Number
         */
        this.cutWith = this.width;

        this.ManaSTDrecovertime = 0;
        this.manarate = 1000;
    }

    /**
     * Method that displays the cropping effect of the mana bar based on the cost value that the 
     * character used
     * @param {Number} cost - the mana cost
     */
    cutManaBar(cost){
        //cut the bar to display reducing effect
        
        if(this.currentMana > 0){
            let ratio = cost / this.currentMana;

            this.cutWith = this.cutWith-(this.cutWith * ratio);
            this.setCrop(0,0,this.cutWith,this.height);

            this.currentMana = this.currentMana - cost;
        }

    }

    /**
     * Method that displays the regeneration effect of the mana bar based on the regenAmount
     * @param {Number} regenAmount - the value that character's mana will be regenerated
     */
    regenManaBar(regenAmount){
        // regenrate HP bar to display HP regenration effect

        if(this.currentMana !== this.value){
            let recoverate = regenAmount / this.value;

            this.cutWith = this.cutWith + (this.width * recoverate);
            this.setCrop(0,0,this.cutWith,this.height);

            this.currentMana = this.currentMana + regenAmount;
        }
        else{
           // console.log('Full Mana!');
        }
    }

    update(time, delta){
        if(this.currentMana !== this.value){
            
            if(this.ManaSTDrecovertime < time){
                this.regenManaBar(1);
                this.ManaSTDrecovertime = time + this.manarate;
               // console.log('mana regen 1 !');
            }
       }
    }
}