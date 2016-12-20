//functions and prototypes

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
