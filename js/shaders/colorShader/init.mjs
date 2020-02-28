export function initBuffers(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  const positions = [
    // Base
    -1.0, -0.5773, -0.5773,
    1.0, -0.5773, -0.5773,
    0.0, 1.1547, -0.5773,

    // First side
    -1.0, -0.5773, -0.5773,
    1.0, -0.5773, -0.5773,
    0.0, 0.0, 1.1547,

    // Second side
    1.0, -0.5773, -0.5773,
    0.0, 1.1547, -0.5773,
    0.0, 0.0, 1.1547,

    // Third side
    0.0, 1.1547, -0.5773, 
   -1.0, -0.5773, -0.5773,
    0.0, 0.0, 1.1547
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  const faceColors = [
    [1.0, 1.0, 1.0, 1.0], // Base: white
    [1.0, 0.0, 0.0, 1.0], // First Side: red
    [0.0, 1.0, 0.0, 1.0], // Second Side: green
    [0.0, 0.0, 1.0, 1.0] // Third Side: blue
  ];

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    colors = colors.concat(c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0, 1, 2, // front
    3, 4, 5, // back
    6, 7, 8, // top
    9, 10, 11 // bottom

  ];

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}