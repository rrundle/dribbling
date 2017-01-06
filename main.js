//Setting global variables

var guy = document.querySelector('.player')

var dribbler = new Player([0, 0], 'east', 1.5, guy)

var cone = document.querySelectorAll('.cone')
var player = document.getElementById('player')

var coneArray = []
var pointTotal = []

var startDribble
var startCrash
var pointCount

var points = 0
var sessions = 5
var sessionTotal = 0

var sessionsLeft = document.getElementById('total-lives')

var intro = document.querySelectorAll('.intro')
var game = document.querySelectorAll('.game')
var crash = document.querySelectorAll('.crash')
var retrain = document.querySelector('.retrain')

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

for (var i = 0; i < cone.length; i++) {
  coneArray.push({x: cone[i].offsetLeft, y: cone[i].offsetTop})
}

function playerCrash(array, player) {
  var totalScore = document.getElementById('score')
  var sessionScore = document.getElementById('session-score')
  for (var i = 0; i < array.length; i++) {
    if (((player.offsetLeft || (player.offsetLeft + 32)) >= array[i].x) && ((player.offsetLeft || (player.offsetLeft + 32)) <= (array[i].x + 40))) {
      if ((((player.offsetTop + 80) || (player.offsetTop + 100)) >= array[i].y) && (((player.offsetTop + 80) || (player.offsetTop + 100)) <= (array[i].y + 30))) {
        dribbler.speed = 0
        viewSwitch(game, crash)
        sessionCounter(sessionsLeft)
        clearInterval(startDribble)
        clearInterval(startCrash)
        clearInterval(pointCount)
        totalScore.textContent = 'Total dribbling points: ' + points
        pointTotal.push(points)
      }
    }
  }
  if (player.offsetTop < -80 || player.offsetTop > 620 || player.offsetLeft > 1420 || player.offsetLeft < 0) {
    dribbler.speed = 0
    viewSwitch(game, crash)
    sessionCounter(sessionsLeft)
    clearInterval(startDribble)
    clearInterval(startCrash)
    clearInterval(pointCount)
    totalScore.textContent = 'Total dribbling points: ' + points
    pointTotal.push(points)
  }
  var score
  if (pointTotal.length === 1) {
    score = pointTotal[0]
  }
  else {
    score = (pointTotal[sessionTotal - 1] - pointTotal[sessionTotal -2])
  }
  sessionScore.textContent = 'Session dribbling points: ' + score
}

function dribble() {
  dribbler.NewSpot()
}

function checkCrash() {
  playerCrash(coneArray, player)
}

function pointCounter() {
  points += 1
  var counter = document.getElementById('points')
  counter.textContent = 'Skill points: ' + points
}

function sessionCounter(element) {
  sessions -= 1
  sessionTotal += 1
  element.textContent = 'Sessions remaining: ' + sessions
  if (sessions == 0) {
    var restart = document.querySelectorAll('.restart')
    var retrainButton = document.getElementById('retrain-button')
    retrainButton.parentNode.removeChild(retrainButton)
    var totalLives = document.getElementById('total-lives')
    totalLives.parentNode.removeChild(totalLives)
    var slide = document.getElementById('slide')
    slide.parentNode.removeChild(slide)
    viewSwitch(retrain, restart)
  }
}

//EVENT LISTENERS
document.addEventListener('click', function(e) {
  if (e.target.className.indexOf('intro') !== -1) {
    viewSwitch(intro, game)
    startDribble = setInterval(dribble, 1)
    startCrash = setInterval(checkCrash, 1)
    pointCount = setInterval(pointCounter, 25)
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
    dribbler.direction = 'east'
    break
  }
})

document.addEventListener('click', function(e) {
  if (e.target.id.indexOf('retrain-button') !== -1) {
    dribbler.location = [0,0]
    dribbler.speed = 1.5
    dribbler.direction = 'east'
    viewSwitch(crash, game)
    startDribble = setInterval(dribble, 1)
    startCrash = setInterval(checkCrash, 1)
    pointCount = setInterval(pointCounter, 25)
  }
})

document.addEventListener('click', function(e) {
  if (e.target.id.indexOf('restart-button') !== -1) {
    location.reload()
  }
})
