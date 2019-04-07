"use strict";
var m4 = twgl.m4;
var gl = document.getElementById("c").getContext("webgl");
// compiles shader, links and looks up locations
var programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

var arrays = {
  position: [
    1, 1, -1, 1, 
    1, 1, 1, -1, 
    1, 1, -1, -1, 
    -1, 1, 1, -1, 
    1, -1, -1, -1, 
    -1, -1, -1, 1, 
    -1, 1, 1, 1,
    1, 1, 1, 1, 
    -1, -1, 1, -1,
    -1, -1, -1, 1,
    -1, -1, 1, -1,
    1, -1, -1, 1,
    1, 1, 1, -1,
    1, 1, -1, -1,
    1, 1, -1, 1,
    -1, 1, -1, 1,
    1, -1, 1, -1,
     -1, -1, -1, -1],
  texcoord: [
 // select the bottom left image
    0   , 0  ,
    0   , 0.5,
    0.25, 0.5,
    0.25, 0  ,
    // select the bottom middle image
    0.25, 0  ,
    0.5 , 0  ,
    0.5 , 0.5,
    0.25, 0.5,
    // select to bottom right image
    0.5 , 0  ,
    0.5 , 0.5,
    0.75, 0.5,
    0.75, 0  ,
    // select the top left image
    0   , 0.5,
    0.25, 0.5,
    0.25, 1  ,
    0   , 1  ,
    // select the top middle image
    0.25, 0.5,
    0.25, 1  ,
    0.5 , 1  ,
    0.5 , 0.5,
    // select the top right image
    0.5 , 0.5,
    0.75, 0.5,
    0.75, 1  ,  
    0.5 , 1  ,
  ],
  indices:  [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23],
};
// calls gl.createBuffer, gl.bindBuffer, gl.bufferData for each array
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);


var ctx = document.createElement("canvas").getContext("2d");
ctx.canvas.width = 512;
ctx.canvas.height = 256;
ctx.fillRect(0, 0, 512, 256);  // black to start

var tex = gl.createTexture();
uploadCanvasToTexture();

[
  "https://i.imgur.com/weklTat.gif",
  "https://i.imgur.com/6AvnLa3.jpg",
  "https://i.imgur.com/HkzeCU2.jpg",
  "https://i.imgur.com/D9HVm6n.png",
  "https://i.imgur.com/7MlmkJr.jpg",
  "https://i.imgur.com/v38pV.jpg",
].forEach(function(url, ndx) {
  var img = new Image();
  img.onload = function() {
    addFaceToCanvasAndUploadToTexture(img, ndx);
  };
  img.crossOrigin = "";
  img.src = url;
});
  
function addFaceToCanvasAndUploadToTexture(img, ndx) {
  var x = ndx % 3;
  var y = ndx / 3 | 0;
  ctx.drawImage(img, 0, 0, img.width, img.height, x * 128, y * 128, 128, 128);
  uploadCanvasToTexture();
}
  
function uploadCanvasToTexture() {
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ctx.canvas);
  gl.generateMipmap(gl.TEXTURE_2D);
}    
    
var uniforms = {
  u_texture: tex,
};

function render(time) {
  time *= 0.001;
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 10);
  var eye = [1, 4, -6];
  var target = [0, 0, 0];
  var up = [0, 1, 0];

  var camera = m4.lookAt(eye, target, up);
  var view = m4.inverse(camera);
  var viewProjection = m4.multiply(view, projection);
  var world = m4.rotationY(time);

  uniforms.u_worldViewProjection = m4.multiply(world, viewProjection);

  gl.useProgram(programInfo.program);
  // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  // calls gl.uniformXXX, gl.activeTexture, gl.bindTexture
  twgl.setUniforms(programInfo, uniforms);
  // calls gl.drawArray or gl.drawElements
  twgl.drawBufferInfo(gl, gl.TRIANGLES, bufferInfo);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);