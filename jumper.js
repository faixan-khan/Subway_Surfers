var jet_rotation = 0;
function initJumper(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.
    width = 0.1
    length = 0.2
    height = 0.1
  const positions = [
    // Front face

    -width, -length,  height,
     width, -length,  height,
     width,  length,  height,
    -width,  length,  height,
    // back face
    -width, -length,  -height,
    width, -length,  -height,
    width,  length,  -height,
   -width,  length,  -height,
    //
    -width, -length, height,
    -width, -length, -height,
    -width, length, -height,
    -width, length, height,
    //
    width, -length, height,
    width, -length, -height,
    width, length, -height,
    width, length, height,
    
    -width, length, height,
    -width, length, -height,
    width, length, -height,
    width, length, height,

    -width, -length, height,
    -width, -length, -height,
    width, -length, -height,
    width, -length, height,
  ];


  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,0.0,1.0,0.0,
    1.0,1.0,0.0,1.0,
    // Back
    0.0,0.0,1.0,0.0,
    1.0,1.0,0.0,1.0,
    // Top
    0.0,0.0,1.0,0.0,
    1.0,1.0,0.0,1.0,
    // Bottom
    0.0,0.0,1.0,0.0,
    1.0,1.0,0.0,1.0,
    // Right
    0.0,0.0,1.0,0.0,
    1.0,1.0,0.0,1.0,
    // Left
    0.0,0.0,1.0,0.0,
    1.0,1.0,0.0,1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,
    8,  9,  10,     8,  10,  11,
    12, 13, 14,     12, 14, 15,
    16, 17, 18,     16, 18, 19,
    20, 21, 22,      20, 22, 23, 
  ];

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//
function drawJumper(gl, programInfo, jumper, texture, deltaTime) {

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 1000.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 jumper.position); 
                //  console.log(tn.position) // amount to translate

  //Write your code to Rotate the cube here//
 // mat4.rotate(modelViewMatrix,     // destination matrix
 //    modelViewMatrix,cubeRotation,     // matrix to translate
 //    [0.0, 1.0, 1.0]);  // amount to translate
 mat4.rotate(modelViewMatrix, modelViewMatrix, jet_rotation * 5, [0, 1, 0]);




  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, jumper.buffer.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }



  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, jumper.buffer.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
}

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, jumper.buffer.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
    
      gl.activeTexture(gl.TEXTURE0);

      // Bind the texture to texture unit 0
      gl.bindTexture(gl.TEXTURE_2D, texture);
    
      // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  // Update the rotation for the next draw

  jet_rotation += 0.01;
}
