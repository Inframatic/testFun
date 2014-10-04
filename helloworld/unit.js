goog.provide('mobaTowerDefense.Unit');
goog.require('lime.Circle');

mobaTowerDefense.Unit = function(gameObject, gameLayer) {
  goog.base(this);

  this.gameObject = gameObject;
  this.gameLayer = gameLayer;
  this.healthCounter = 100;
  this.shield = false;
  this.attack = 100;

  this.setPosition(this.gameObject.width/2, this.gameObject.height/2);
  this.updateLook();   

  //remaps things every 110 miliseconds. So the more often it checks potentially will increase performance?
  var dt = 100;
  lime.scheduleManager.scheduleWithDelay(function(){
    //I can set timers here. Like every 10 seconds, the castle refreshes
    //every second the unit loses 2 health
    this.health -= 0.2;

    //Destroy the tower!
    if(this.health <= 0) {
      console.log('A Castle has been destroyed!');
      // location.reload() reloads the page for GAME OVER
    }
    this.updateLook();
  }, this, dt);
};

  goog.inherits(mobaTowerDefense.Unit,lime.Circle);
  mobaTowerDefense.Unit.prototype.updateLook = function() {
    var castleLevel = this.gameObject.maxCastleLevel * this.health/100;
    this.setSize(castleLevel,castleLevel)

    //the different levels of the castle represented on
    var castleLevel1 = parseInt((100-this.castleLevel)/100*255); //255 if castle is level 0
    var castleLevel2 = parseInt((this.castleLevel)/100*255); //255 if 100 and castle has full life
    this.setFill(castleLevel1,castleLevel2,0); //this fill can be set as an image or a #color
  };