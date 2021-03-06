var gamejs = require("gamejs");
var $m = require("gamejs/utils/math");
var $laser = require("bullets/laser").Laser;
var $g = require("globals")

var Rocket = function(rect, ship, pos) {
  // call superconstructor
  Rocket.superConstructor.apply(this, arguments);
  this.image = gamejs.image.load("./images/Player/rocket.png");
  this.originalImage = gamejs.transform.scale(this.image, rect);
  this.image = gamejs.transform.rotate(this.originalImage, $m.degrees(ship.rotation)+90);

  var vX = 20*Math.cos(ship.rotation);
  var vY = 20*Math.sin(ship.rotation);
  this.velocity = [vX, vY];

  this.rect.center = ship.pos;
  if (pos) this.rect.center = pos;
  this.ship = ship;

  this.rect.width = this.image.rect.width;
  this.rect.height = this.image.rect.height;

  this.damage = 75*this.ship.stats.damage/100;

  return this;
};
gamejs.utils.objects.extend(Rocket, $laser);


Rocket.prototype.kill = function(){
  var that = this;
  var newRocket = new Rocket([250, 250], that.ship, that.pos);

  var collided = gamejs.sprite.spriteCollide(newRocket, $g.projectiles, false);
  var eCollided = gamejs.sprite.spriteCollide(newRocket, $g.eShips, false);

  collided.forEach(function(proj){
    proj.damage(that.damage);
  });

  eCollided.forEach(function(eShip){
    eShip.damage(that.damage);
    if (eShip.dead < 0) $g.ship.addExp(eShip.exp);
  });

  $laser.prototype.kill.apply(this);
};

Rocket.prototype.update = function (msDuration){
  this.checkbounds();
  this.rect.moveIp($g.calcVelocity(msDuration, this.velocity));
  this.collide();
  this.rect.width = this.image.rect.width;
  this.rect.height = this.image.rect.height;
};



exports.Rocket = Rocket;