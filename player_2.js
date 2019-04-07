function initPlayer2(gl) {

    // Create a buffer for the cube's vertex positions.
  
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the cube.
      width = 0.07
      length = 0.4
      height = 0.03
      head_width = 0.05;
      head_length = 0.1;
      arm_width = 0.03;
      shorten = -0.15
      length_arm = 0.25;
    const positions = [
      // Front face
  
      -width, -shorten,  height,
       width, -shorten,  height,
       width,  length,  height,
      -width,  length,  height,
      // back face
      -width, -shorten,  -height,
      width, -shorten,  -height,
      width,  length,  -height,
     -width,  length,  -height,
      //
      -width, -shorten, height,
      -width, -shorten, -height,
      -width, length, -height,
      -width, length, height,
      //
      width, -shorten, height,
      width, -shorten, -height,
      width, length, -height,
      width, length, height,
      
      -width, length, height,
      -width, length, -height,
      width, length, -height,
      width, length, height,
  
      -width, -shorten, height,
      -width, -shorten, -height,
      width, -shorten, -height,
      width, -shorten, height,
  
      /// head///
      -head_width,length,height,
      head_width, length,height,
      head_width, length+head_length,height,
      -head_width,length+head_length,height,
  
      -head_width ,length,  -height,
       head_width ,length,  -height,
       head_width  ,length+head_length,  -height,
      -head_width  ,length+head_length,  -height,
      //
      -head_width, length, height,
      -head_width, length, -height,
      -head_width, length+head_length, -height,
      -head_width, length+head_length, height,
      //
      head_width, length, height,
      head_width, length, -height,
      head_width, length+head_length, -height,
      head_width, length+head_length, height,
      
      -head_width, length+head_length, height,
      -head_width, length+head_length, -height,
       head_width, length+head_length, -height,
       head_width, length+head_length, height,
  
      -head_width, length, height,
      -head_width, length, -height,
       head_width, length, -height,
       head_width, length, height,
  
       ///////////arm right///////////////
       width,length_arm,height,
       width+arm_width,length_arm,height,
       width,length,height,
       width+arm_width,length,height,
   
       width,length_arm,-height,
       width+arm_width,length_arm,-height,
       width,length,-height,
       width+arm_width,length,-height,
   
       width,length_arm,height,
       width,length_arm,-height,
       width,length,height,
       width,length,-height,
   
       width+arm_width,length_arm,height,
       width+arm_width,length_arm,-height,
       width+arm_width,length,height,
       width+arm_width,length,-height,
   
       width,length_arm,height,
       width+arm_width,length_arm,height,
       width,length,height,
       width+arm_width,length,height,
   
       width,length_arm,-height,
       width+arm_width,length_arm,-height,
       width,length,-height,
       width+arm_width,length,-height,
      // width,length_arm,height,
      // width+arm_width,length_arm,height,
      // width,length,height,
      // width+arm_width,length,height,
  
      // width,length_arm,-height,
      // width+arm_width,length_arm,-height,
      // width,length,-height,
      // width+arm_width,length,-height,
  
      // width,length_arm,height,
      // width,length_arm,-height,
      // width,length,height,
      // width,length,-height,
  
      // width+arm_width,length_arm,height,
      // width+arm_width,length_arm,-height,
      // width+arm_width,length,height,
      // width+arm_width,length,-height,
  
      // width,length_arm,height,
      // width+arm_width,length_arm,height,
      // width,length,height,
      // width+arm_width,length,height,
  
      // width,length_arm,-height,
      // width+arm_width,length_arm,-height,
      // width,length,-height,
      // width+arm_width,length,-height,
  
      //////////////arm left/////////////////////
  
      -width,length_arm,height,
    -width-arm_width,length_arm,height,
    -width,length,height,
    -width-arm_width,length,height,

    -width,length_arm,-height,
    -width-arm_width,length_arm,-height,
    -width,length,-height,
    -width-arm_width,length,-height,

    -width,length_arm,height,
    -width,length_arm,-height,
    -width,length,height,
    -width,length,-height,

    -width-arm_width,length_arm,height,
    -width-arm_width,length_arm,-height,
    -width-arm_width,length,height,
    -width-arm_width,length,-height,

    -width,length_arm,height,
    -width-arm_width,length_arm,height,
    -width,length,height,
    -width-arm_width,length,height,

    -width,length_arm,-height,
    -width-arm_width,length_arm,-height,
    -width,length,-height,
    -width-arm_width,length,-height,

  
      /////////////////////legs///////////////
  
      width,-shorten,height,
      width-0.07,-shorten,height,
      width,shorten,-10*height,
      width-0.07,shorten,-10*height,
  
      -width,-shorten,height,
      -width+0.07,-shorten,height,
      -width,shorten,10*height,
      -width+0.07,shorten,10*height,
  
  
  
      
  
  
    ];
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    // Now set up the colors for the faces. We'll use solid colors
    // for each face.
  
    // const faceColors = [
    //   [1.0,  0.0,  0.0,  1.0],
    //   [1.0,  0.8,  0.5,  1.0],
    //   [1.0,  0.0,  0.4,  1.0],
    //   [1.0,  1.0,  1.0,  1.0],
    //   [1.0,  1.0,  0.0,  1.0],
    //   [1.0,  0.0,  1.0,  1.0],    // Left face: purple
    // ];
  
    // var colors = [];
  
    // for (var j = 0; j < faceColors.length; ++j) {
    //   const c = faceColors[j];
  
    //   // Repeat each color four times for the four vertices of the face
    //   colors = colors.concat(c, c, c, c);
    // }
  
    // const colorBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  
    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.
  
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
      ////head////////////
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
      ////////arm/////////////
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
      /////////////////////arm///////////////////
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
      ///////legs//////
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      ////leg/////////////
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
        ////head//////
        24,  25,  26,      24,  26,  27,    // front
        28,  29,  30,      28,  30,  31,
        32,  33,  34,     32,  34,  35,
        36, 37, 38,     36, 38, 39,
        40, 41, 42,     40, 42, 43,
        44, 45, 46,      44, 46, 47, 
        //////arm//////////
        48,  49,  50,      48,  50,  51,    // front
        52,  53,  54,      52,  54,  55,
        56,  57,  58,     56,  58,  59,
        60, 61, 62,     60, 62, 63,
        64, 65, 66,     64, 66, 67,
        68, 69, 70,      68, 70, 71,
  ////////////////////right arm////////////
        72, 73, 74,     72, 74, 75,
        76, 77, 78,     76, 78, 79,
        80, 81, 82,     80, 82, 83,
        84, 85, 86,     84, 86, 87,
        88, 89, 90,     88, 90, 91,
        92, 93, 94,     92, 94, 95,
      /////legs/////////////////
        96, 97, 98,     96,98,99,
  
        100,101,102,    100,102,103,
  
  
      
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
  function drawPlayer2(gl, programInfo, player, texture_back,texture_arms,texture_leg,texture_hair, deltaTime) {
  
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
                   player.position); 
                  //  console.log(tn.position) // amount to translate
  
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
      gl.bindBuffer(gl.ARRAY_BUFFER, player.buffer.position);
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
    // {
    //   const numComponents = 4;
    //   const type = gl.FLOAT;
    //   const normalize = false;
    //   const stride = 0;
    //   const offset = 0;
    //   gl.bindBuffer(gl.ARRAY_BUFFER, tran.buffer.color);
    //   gl.vertexAttribPointer(
    //       programInfo.attribLocations.vertexColor,
    //       numComponents,
    //       type,
    //       normalize,
    //       stride,
    //       offset);
    //   gl.enableVertexAttribArray(
    //       programInfo.attribLocations.vertexColor);
    // }
  
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, player.buffer.textureCoord);
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
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, player.buffer.indices);
  
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
      
       // gl.activeTexture(gl.TEXTURE0);
  
        // Bind the texture to texture unit 0
        //gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.bindTexture(gl.TEXTURE_2D, texture_back);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  
        gl.bindTexture(gl.TEXTURE_2D, texture_hair);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 72);
  
        gl.bindTexture(gl.TEXTURE_2D, texture_arms);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT,144 );
  
        gl.bindTexture(gl.TEXTURE_2D, texture_arms);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 216);
      
        gl.bindTexture(gl.TEXTURE_2D, texture_leg);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 288);
  
        gl.bindTexture(gl.TEXTURE_2D, texture_leg);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 300);
        // Tell the shader we bound the texture to texture unit 0
      gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  
    {
      const vertexCount = 36*4+12;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
     // gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  
    // Update the rotation for the next draw
  
    cubeRotation += deltaTime;
  }
  