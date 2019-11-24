	// geometry
	var geometry = new THREE.BufferGeometry();
	var fraction = 0;
	var lineLength;

	// attributes
	numPoints = points.length;
	var positions = new Float32Array( numPoints * 3 ); // 3 vertices per point
	var colors = new Float32Array( numPoints * 3 ); // 3 channels per point
	var lineDistances = new Float32Array( numPoints * 1 ); // 1 value per point

	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	geometry.addAttribute( 'lineDistance', new THREE.BufferAttribute( lineDistances, 1 ) );

	// populate
	var color = new THREE.Color();

	for ( var i = 0, index = 0, l = numPoints; i < l; i ++, index += 3 ) {

		positions[ index ] = points[ i ].x;
		positions[ index + 1 ] = points[ i ].y;
		positions[ index + 2 ] = points[ i ].z;

		color.setHSL( i / l, 1.0, 0.5 );

		colors[ index ] = color.r;
		colors[ index + 1 ] = color.g;
		colors[ index + 2 ] = color.b;

		if ( i > 0 ) {

			lineDistances[ i ] = lineDistances[ i - 1 ] + points[ i - 1 ].distanceTo( points[ i ] );

		}

	}

	lineLength = lineDistances[ numPoints - 1 ];

	// material
	var material = new THREE.LineDashedMaterial( {

  	vertexColors: THREE.VertexColors,
  	dashSize: 1, // to be updated in the render loop
  	gapSize: 1e10 // a big number, so only one dash is rendered

	} );

	// line
	line = new THREE.Line( geometry, material );
	scene.add( line );


