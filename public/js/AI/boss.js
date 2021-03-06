var gamejs = require("gamejs");
var $g = require("globals");
var $e = require("gamejs/event");
var $m = require("gamejs/utils/math");
var $laser = require("AI/enemyLaser").eLaser;
var $eShip  = require("AI/enemyShip").eShip;

var Boss = function(rect) {
  // call superconstructor
  Boss.superConstructor.apply(this, arguments);
  this.image = gamejs.image.load("./images/Enemies/boss.png");
  this.originalImage = gamejs.transform.scale(this.image, rect);
  this.image = gamejs.transform.rotate(this.originalImage, 90);

  this.stats = {
    maxSpeed    :   2,
    maxHealth   :   2000 + $g.level.number*20,
    maxFireRate :   Math.random()*1000 + 100 - $g.level.number*10,
    accuracy    :   0,
    luck        :   0,
    damage      :   100 + $g.level.number*10
  };

  this.pos = [$g.game.screenSize[0]/2, 0];

  this.exp = 100;

  this.health = this.stats.maxHealth;

  this.setVelocity();

  return this;
};
gamejs.utils.objects.extend(Boss, $eShip);


Boss.prototype.kill = function (keepAlive) {

  $eShip.prototype.kill.apply(this, keepAlive);

  $g.time = $g.level.time;

};


Boss.prototype.checkbounds = function(){
  $eShip.prototype.checkbounds.apply(this);
};


exports.Boss = Boss;