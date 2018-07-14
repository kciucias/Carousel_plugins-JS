(function() { 

'use strict';

//mustache
var templateSlide = document.getElementById('template-slide').innerHTML;
Mustache.parse(templateSlide);

var results = document.getElementById('results');
var allSlides ='';

for (var i = 0; i < slides.length; i++){
  allSlides += Mustache.render(templateSlide, slides[i]);
}

//var generateSlides = Mustache.render(templateSlide, allSlides)

results.insertAdjacentHTML('beforeend', allSlides);

//carousel
var flkty = new Flickity('.main-carousel', {
  pageDots: false, 
  wrapAround: true,
  cellAlign: "left",
  contain: true
});

// progress bar
var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

// reset button
document.getElementById('reset').addEventListener('click', function() {
    flkty.select(0);
});


// navigation buttons
var anchors = document.querySelectorAll('.button-group a');

for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(e) {
        var slideNumber = e.target.getAttribute('data-index');
        flkty.select(slideNumber);
    });
}


// MAPS
    window.initMap = function() {
      // Zapisujemy w zmiennej obiekt zawierający współrzędne geograficzne.
      var krakow = {lat: 50.062112, lng: 19.929334};
      // W zmiennej map zapisujemy nową instancję obiektu Map. 
      var map = new google.maps.Map(document.getElementById('map'), {
        // Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
        center: krakow,
        zoom: 7,
      });

      for (var key in slides) { 
      var marker = new google.maps.Marker({
      position: slides[key]['coords'], map: map})
    }
}


})(); 

