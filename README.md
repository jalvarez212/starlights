# Starlights / Luces En El Cielo

## Overview
A 3D rendering for web browsers that animates constellations in the night sky and reveals messages. Threejs used for WebGL engine. 

## Dependencies 

The scene requires the following scripts for rendering in the web browser. 

          <script src="https://threejs.org/build/three.min.js"></script>
          <script src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/WebGL.js"></script>
          <script src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/controls/OrbitControls.js"></script>
          <script src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/controls/DeviceOrientationControls.js"></script>
          <script src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/renderers/CSS2DRenderer.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/mobile-detect@1.4.4/mobile-detect.min.js"></script>
          <script src="js/Stats.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineLite.min.js"></script>


## Usage
The files must be rendered via HTTP server.

For fast and easy deployment, you can run python to render the files. Naviagate to the local directory in your terminal or command line and run the following command:

        python -m SimpleHTTPServer 8080
        
You can then view the build at http://localhost:8080/ in your web browser. 


----
***

The coordinates for the constellations are loaded via JSON.The first argument of the loadJSON function accepts the path to the JSON file as a sting. 

              loadJSON('json/constellations.json',
                function (data) {
                  console.log(data);
                  db = data;
                  if (deeplinkRef) {
                    deeplinkInterval = setInterval(function () {
                      showConstellation(deeplinkRef);
                      clearInterval(deeplinkInterval);
                    }, 2000);
                  }
                },
                function (xhr) { console.error(xhr); }
              );
              

            
The animation system is activated using the scene camera to detect if an object is within view. The build uses the frustrum object as a raycaster in the scene. If a constellation is within view it will start the animation.

              if (animation_target && animation_trigger == false) {
                //console.log( frustum.intersectsObject( animation_target ) );
                if (frustum.intersectsObject(animation_target)) {
                  console.log('animation triggered');
                  animation_trigger = true;
                  var duration = 0.3;
                  for (var i = 0; i < lineList.length; i++) {
                    console.log('tween line');
                    TweenMax.to(lineList[i].scale, duration, { z: 1, ease: Quad.easeOut, delay: i * duration });
                  }
                  for (var i = 0; i < starList.length; i++) {
                    console.log('tween star');
                    TweenMax.to(starList[i].material, duration, {
                      opacity: 1, ease: Quad.easeOut, delay: i * duration,
                      onComplete: function () { TweenMax.to(this.target, 0.5 + Math.random(), { opacity: 0.7, repeat: -1, yoyo: true, ease: Sine.easeInOut }); }
                    });
                    var lbl = document.getElementById('span_' + i);
                    TweenMax.to(lbl, duration, { opacity: 1, ease: Quad.easeOut, delay: i * duration });
                  }
                }
              }
            }
            
            
            
The JSON data is loaded into the event system via keyboard events on desktop.

        document.addEventListener("keydown", onDocumentKeyDown, false);
            function onDocumentKeyDown(event) {
              var keyCode = event.which;
              var rot = universe.rotation;
              var inc = Math.PI / 100 * keyboardIncDirection;
              if (keyCode == 88) {  		// x
                rot.x += inc;
              } else if (keyCode == 89) { // y
                rot.y += inc;
              } else if (keyCode == 90) { // z
                rot.z += inc;
              } else if (keyCode == 82) { // r
                rot.x = rot.y = rot.z = 0;
              } else if (keyCode == 83) {	// s
                wipeConstellation();
              } else if (keyCode == 16) {	// SHIFT
                factor = -1 * keyboardIncDirection;
              } else if (keyCode == 49) {	// 1
                showConstellation(languange + "01");
              } else if (keyCode == 50) {	// 2
                showConstellation(languange + "02");
              } else if (keyCode == 51) {	// 3
                showConstellation(languange + "03");
              } else if (keyCode == 52) {	// 4
                showConstellation(languange + "04");
              } else if (keyCode == 53) {	// 5
                showConstellation(languange + "05");
              } else if (keyCode == 54) {	// 6
                showConstellation("WHH148844");
              } else if (keyCode == 55) {	// 7
                showConstellation("CGX414051");
              } else if (keyCode == 56) {	// 8
                showConstellation("PCF332711");
              } else if (keyCode == 57) {	// 9
                showConstellation("DRK172920");
              } else if (keyCode == 48) {	// 0
                showConstellation("GPS061296");
              } else if (keyCode == 37) {	// LEFT
                browseConstellationData("previous");
                console.log("LEFT");
              } else if (keyCode == 39) {	// RIGHT
                browseConstellationData("next");
                console.log("RIGHT");
              } else if (keyCode == 38) {	// TOP
                browseConstellationData("beginning");
                console.log("TOP");
              } else if (keyCode == 40) {	// BOTTOM
                browseConstellationData("end");
                console.log("BOTTOM");
              } else if (keyCode == 69) {	// e ES
                languange = "es";
              } else if (keyCode == 80) {	// p PT
                languange = "pt";
              } else if (keyCode == 71) {	// g GL
                languange = "gl";
              }
              console.log(keyCode, rot.x, rot.y, rot.z)
            };
            
            
     
Textures for particles, models, and backgrounds can be changed and lodaed via the textureLoader constructor. 

              textureLoader = new THREE.TextureLoader();
              starMap = textureLoader.load('textures/starmap4k.jpg');
   
