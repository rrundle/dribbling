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

//event listeners
document.addEventListener('click', function(e) {
  if (e.target.className.indexOf('intro') !== -1) {
    var hide = document.querySelectorAll('.intro')
    var view = document.querySelectorAll('.game')
    viewSwitch(hide, view)
  }
})
