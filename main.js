//Setting variables
var guy = document.querySelector('.player')

var dribbler = new Player([0, 0], 'east', 1.5, guy)

//functions and prototypes

function Player(location, direction, speed, marker) {
  this.location = location
  this.direction = direction
  this.speed = speed
  this.marker = marker
  this.marker.setAttribute('id', 'player')
}

Player.prototype.NewSpot = function() {
  if (this.direction === 'north') {
    this.location[1] -= this.speed
  }
  if (this.direction === 'south') {
    this.location[1] += this.speed
  }
  if (this.direction === 'west') {
    this.location[0] -= this.speed
  }
  if (this.direction === 'east') {
    this.location[0] += this.speed
  }
  if (this.direction === 'stop') {
    this.speed = 0
  }
  this.marker.style.top = this.location[1] + 'px'
  this.marker.style.left = this.location[0] + 'px'
}

function viewSwitch(hide, view) {
  for (var i = 0; i < hide.length; i++) {
    hide[i].style.visibility = 'hidden'
  }
  for (var j = 0; j < view.length; j++) {
    view[j].style.visibility = 'visible'
  }
}

//Register a crash with a cone

var cone = document.querySelectorAll('.cone')
var player = document.getElementById('player')
var coneArray = []

for (var i = 0; i < cone.length; i++) {
  coneArray.push({x: cone[i].offsetLeft, y: cone[i].offsetTop})
}

var intro = document.querySelectorAll('.intro')
var game = document.querySelectorAll('.game')
var crash = document.querySelectorAll('.crash')

function playerCrash(array, player) {
  for (var i = 0; i < array.length; i++) {
    if (((player.offsetLeft || (player.offsetLeft + 32)) >= array[i].x) && ((player.offsetLeft || (player.offsetLeft + 32)) <= (array[i].x + 40))) {
      if ((((player.offsetTop + 80) || (player.offsetTop + 100)) >= array[i].y) && (((player.offsetTop + 80) || (player.offsetTop + 100)) <= (array[i].y + 30))) {
        dribbler.speed = 0
        viewSwitch(game, crash)
      }
    }
  }
  if (player.offsetTop < -80 || player.offsetTop > 620 || player.offsetLeft > 1420 || player.offsetLeft < 0) {
    dribbler.speed = 0
    viewSwitch(game, crash)
  }
}

//event listeners
document.addEventListener('click', function(e) {
  if (e.target.className.indexOf('intro') !== -1) {
    viewSwitch(intro, game)
    setInterval(function () {
      dribbler.NewSpot()
    }, 1)
    setInterval(function () {
      playerCrash(coneArray, player)
    }, 1)
  }
})

document.addEventListener('keydown', function(e) {
  switch(e.keyCode) {
    case 38:
    dribbler.direction = 'north'
    break

    case 40:
    dribbler.direction = 'south'
    break

    case 39:
    dribbler.direction = 'east'
    break

    case 37:
    dribbler.direction = 'west'
    break

    default:
    dribbler.speed = 0
    break
  }
})

//game over/restart action
//don't allow player to go off field
//points counter
//penalize somone for going ack and forth constantly
//speed increases over time or levels
