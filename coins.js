var tvc;
function initCoins(gl) {

    // Create a buffer for the cube's vertex positions.
  
    positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the cube.
    
    var positions = [];
    var vertexCount = 100;
    var radius = 0.1;
    for (var i = 0; i < vertexCount; i++)
    {
        positions.push(radius * Math.cos((i / vertexCount) * 2.0 * Math.PI));
        positions.push(radius * Math.sin((i / vertexCount) * 2.0 * Math.PI));
    }
    positions.push(positions[0]);
    positions.push(positions[1]);
    vertexCount += 1;

    tvc = positions.length/3;
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Now set up the colors for the faces. We'll use solid colors
    // for each face.
    faceColors = [];
    var k;
    for(k=0;k<306;k++){
        faceColors.push([66.0/256,  66.0/256,  66.0/256,  0.7]);
      }
  //   var faceColors = [
  //     5,3,7, 5,3,7, 5,3,7, 5,3,7,
  //     1,1,3, 1,1,3, 1,1,3, 1,1,3,
  //     0,0,1, 0,0,1, 0,0,1, 0,0,1,
  //     1,0,0, 1,0,0, 1,0,0, 1,0,0,
  //     1,1,0, 1,1,0, 1,1,0, 1,1,0,
  //     0,1,0, 0,1,0, 0,1,0, 0,1,0
  //  ];
  
    // Convert the array of colors into a table for all the vertices.
  
    var colors = [];
  
    for (var j = 0; j < faceColors.length; ++j) {
      const c = faceColors[j];
  
      // Repeat each color four times for the four vertices of the face
      colors = colors.concat(c, c, c, c);
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
  
    // const indices = [
    //   0,  1,  2,      0,  2,  3,    // front
    //   4,  5,  6,      4,  6,  7,
    //   8,  9,  10,     8,  10,  11,
    //   12, 13, 14,     12, 14, 15,
    //   16, 17, 18,     16, 18, 19,
    //   20, 21, 22,      20, 22, 23, 
    // ];
    var indices = [];
    for(i=0;i<faceColors.length;i++){
      indices.push(4*i+0);
      indices.push(4*i+1);
      indices.push(4*i+2);

      indices.push(4*i+0);
      indices.push(4*i+2);
      indices.push(4*i+3);
    }
  
    // Now send the element array to GL
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
    };
  }
  
  //
  // Draw the scene.
  //
  function drawCoins(gl, programInfo, coin, deltaTime) {
    // gl.clearColor(0.2, 0.2, 0.2, 0.0);  // Clear to black, fully opaque
    // gl.clearDepth(1.0);                 // Clear everything
    // gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    // gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // // Clear the canvas before we start drawing on it.
  
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
  
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
                   coin.position); 
                   //console.log(train.position) // amount to translate
  
    //Write your code to Rotate the cube here//
   // mat4.rotate(modelViewMatrix,     // destination matrix
   //    modelViewMatrix,cubeRotation,     // matrix to translate
   //    [0.0, 1.0, 1.0]);  // amount to translate
  
  
  
  
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, coin.buffer.position);
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
  
    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
      const numComponents = 4;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, coin.buffer.color);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexColor,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexColor);
    }
  
    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coin.buffer.indices);
  
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
  
    {
      const vertexCount = (tvc*6)/4;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  
    // Update the rotation for the next draw
  
    cubeRotation += deltaTime;
  }
  
  //
  // Initialize a shader program, so WebGL knows how to draw our data
  //
  function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    // Create the shader program
  
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    // If creating the shader program failed, alert
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
  
    return shaderProgram;
  }
  
  //
  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
  
    gl.shaderSource(shader, source);
  
    // Compile the shader program
  
    gl.compileShader(shader);
  
    // See if it compiled successfully
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  