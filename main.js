function Car(location, direction, speed, marker) {
  this.location = location
  this.direction = direction
  this.speed = speed
  this.marker = marker
  this.marker.setAttribute('class', 'player')
}

Car.prototype.NewSpot = function() {
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

var ride = document.querySelector('.player')

var bugatti = new Car([0, 0], 'east', 1.5, ride)

var button = document.getElementsByName('button')
document.addEventListener('click', function(e) {
  if (e.target == button) {
    setInterval(function() {
    bugatti.NewSpot()
    }, 1)
  }
})

document.addEventListener('keydown', function(e) {
  switch(e.keyCode) {
    case 38:
    bugatti.direction = 'north'
    break

    case 40:
    bugatti.direction = 'south'
    break

    case 39:
    bugatti.direction = 'east'
    break

    case 37:
    bugatti.direction = 'west'
    break

    default:
    bugatti.speed = 0
    break
  }
})
