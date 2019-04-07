var cubeRotation = 0.0;
var train = [];
var track = [];
var barier = [];
var barricade = [];
var grass = [];
var leftwall = [];
var sidewall=[];
var jetpack = [];
var boost = [];
var jumper = [];
var player = [];
var coin = [];
var police = [];
var dog = [];
var gray = 0;
var flag = 0;
var start = 0;
var elapsed = 0;
var chk = 0
var jump = 0;
var jump_height = -0.3;
var crouch = 2;
var score=0;
var jet_chk = 0;
var jet_time = 0;
var time_chk = 0;
var coin_ct = 0;
var game_start = 0;
var collision_police  = 0;
var police_time = 0;
var game_over = 0;
var shoe_taken = 0;
var shoe_time = 0;
var flash = 0;
var speed = 0.05;

//crashAudio.volume=0.5;
// coinAudio.volume = 0.4;
// polcAudio.volume = 0.4;
// prizeAudio.volume = 0.4;
function startGame()
{
  game_start=1;
  document.getElementById('start').style.visibility = 'hidden';
  document.getElementById('scoreDiv').style.visibility = '';
  document.getElementById('levelDiv').style.visibility = '';
}
if(game_start == 1){
  main();
}
//main();

function main() {
  document.getElementById('theme').play();
  Mousetrap.bind('b',function(){gray=(gray+1)%2;});
  const canvas = document.querySelector('#your_canvas');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');




  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;
  
  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform highp float uFlash;
  uniform int uLevel;

  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
    // Apply lighting effect
    highp vec3 ambientLight = vec3(0.3 + uFlash, 0.3 + uFlash, 0.3 + uFlash);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0, -1, 1));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    if(uLevel==1 || uLevel==3)
      vLighting = ambientLight + (directionalLightColor * directional);
    else
      vLighting = vec3(1.0 + uFlash, 1.0 + uFlash, 1.0 + uFlash);
  }
  `;
  const fsSource = `
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;
  uniform bool uGray;
  uniform highp float uFlash;

  void main(void) {
    if(uGray)
    {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord).rgba;
      highp float grayScale = dot(texelColor.rgb, vec3(0.199, 0.587, 0.114));
      highp vec3 grayImage = vec3(grayScale+uFlash, grayScale+uFlash, grayScale+uFlash);
      gl_FragColor = vec4(grayImage * vLighting, texelColor.a);
    }
    else
    {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord).rgba;
      highp vec3 Image = vec3(texelColor.r + uFlash, texelColor.g + uFlash, texelColor.b + uFlash);
      gl_FragColor = vec4(Image * vLighting, texelColor.a);
    }

  }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
};

  const texture = loadTexture(gl, 'tracks.jpg');
  const train_texture = loadTexture(gl, 'train.jpeg');
  const ad = loadTexture(gl, 'ad.jpg');
  const side_wall = loadTexture(gl, 'wall.jpg');
  const left_wall = loadTexture(gl, 'leftwall.jpg');
  const barricade_texture = loadTexture(gl, 'barricade.png');
  const grass_texture = loadTexture(gl, 'grass.jpg');
  const jet = loadTexture(gl, 'jetpack.png');
  const board = loadTexture(gl, 'board.png');
  const shoe = loadTexture(gl, 'jumper.jpg');
  const coin_t = loadTexture(gl, 'coin.jpeg');
  const back = loadTexture(gl, 'back.jpeg');
  const arms = loadTexture(gl, 'arms.png');
  const hair = loadTexture(gl, 'hair.jpg');
  const leg = loadTexture(gl, 'leg.jpeg');
  const police_leg = loadTexture(gl, 'police_arm.jpeg');
  const police_body = loadTexture(gl, 'police_body.jpeg');
  const police_hair = loadTexture(gl, 'police_hair.jpeg');
  const doggie = loadTexture(gl, 'dog.jpeg');
   
  function initialize()
  {
     train.push({
       buffer : initTrain(gl),
       draw: drawTrain,
       position:[1.2,-1,-20],
     });
  
     train.push({
       buffer : initTrain(gl),
       draw: drawTrain,
       position:[0.0,-1,-40],
     })

     train.push({
       buffer : initTrain(gl),
       draw: drawTrain,
       position:[-1.2,-1,-30],
     });

    track.push({
      buffer: initTracks(gl),
      draw: drawTrack,
      position: [0.0, -1.0, 0.0],
    });

    track.push({
      buffer: initTracks(gl),
      draw: drawTrack,
      position: [0.0, -1.0, -15.0],
    });

    track.push({
      buffer: initTracks(gl),
      draw: drawTrack,
      position: [0.0, -1.0, -30.0],
    });

    track.push({
      buffer: initTracks(gl),
      draw: drawTrack,
      position: [0.0, -1.0, -45.0],
    });

     barier.push({
       buffer : initBarier(gl),
       draw: drawBarier,
       position:[0.0,-1.0 ,-10],
     });
     
     barier.push({
      buffer : initBarier(gl),
      draw: drawBarier,
      position:[1.2,-1.0 ,-20],
    });

     barier.push({
      buffer : initBarier(gl),
      draw: drawBarier,
      position:[-1.2,-1.0 ,-30],
    });

     barricade.push({
      buffer : initBarricade(gl),
      draw: drawBarricade,
      position:[1.2,-1.0 ,-15],
    });


    barricade.push({
      buffer : initBarricade(gl),
      draw: drawBarricade,
      position:[0.0,-1.0 ,-30],
    });

    barricade.push({
      buffer : initBarricade(gl),
      draw: drawBarricade,
      position:[-1.2,-1.0 ,-45],
    });

    grass.push({
      buffer : initGrass(gl),
      draw: drawGrass,
      position:[1.2,-1.0 ,-27],
    });


    grass.push({
      buffer : initGrass(gl),
      draw: drawGrass,
      position:[1.2,-1.0 ,-54],
    });


    grass.push({
      buffer : initGrass(gl),
      draw: drawGrass,
      position:[1.2,-1.0 ,-43],
    });

    jetpack.push({
      buffer : initJetpack(gl),
      draw: drawJetpack,
      position:[0.0,-1.0 ,-53],
    });

    boost.push({
      buffer : initBoost(gl),
      draw: drawBoost,
      position:[-1.2,-1.0 ,-47],
    });

    jumper.push({
      buffer : initJumper(gl),
      draw: drawJumper,
      position:[1.2,-1.0 ,-13],
    });


    police.push({
      buffer : initPolice(gl),
      draw: drawPolice,
      position:[0.0,-1.0 ,-3],
    });

    dog.push({
      buffer : initDog(gl),
      draw: drawDog,
      position:[0.0,-0.9 ,-3.5],
    });

    dog.push({
      buffer : initDog(gl),
      draw: drawDog,
      position:[0.0,-0.85 ,-3.5],
    });


    for(var i=0;i<30;i++)
    {
      coin.push({
        buffer : initCoin(gl),
        draw: drawCoin,
        position:[1.2,-0.9 ,-i-6],
      });
    }

    for(var i=0;i<30;i++)
    {
      coin.push({
        buffer : initCoin(gl),
        draw: drawCoin,
        position:[-1.2,-0.9 ,-i-6],
      });
    }

    player.push({
       buffer : initPlayer(gl),
       draw: drawPlayer,
       position:[0.0, -1 ,-4],
     });
  
  
    player.push({
      buffer : initPlayer2(gl),
      draw: drawPlayer2,
      position:[0.0, -1 ,-4],
    });
  



     sidewall.push({
      buffer : initSidewall(gl),
      draw: drawSidewall,
      position:[2,-1.0 ,0],
    });

    leftwall.push({
      buffer : initLeftwall(gl),
      draw: drawLeftwall,
      position:[-2,-1.0 ,0],
    });

    sidewall.push({
      buffer : initSidewall(gl),
      draw: drawSidewall,
      position:[2,-1.0 ,-15],
    });

    leftwall.push({
      buffer : initLeftwall(gl),
      draw: drawLeftwall,
      position:[-2,-1.0 ,-15],
    });

    sidewall.push({
      buffer : initSidewall(gl),
      draw: drawSidewall,
      position:[2,-1.0 ,-30],
    });

    leftwall.push({
      buffer : initLeftwall(gl),
      draw: drawLeftwall,
      position:[-2,-1.0 ,-30],
    });

    sidewall.push({
      buffer : initSidewall(gl),
      draw: drawSidewall,
      position:[2,-1.0 ,-45],
    });

    leftwall.push({
      buffer : initLeftwall(gl),
      draw: drawLeftwall,
      position:[-2,-1.0 ,-45],
    });



  }
 
  var then = 0;
  var scene_pos = -60.0;  
  function collisions(){
    /////////////////////////////////// with train///////////////////////
    var collision = 0;
    var top = 0;
    for(var i=0;i<3;i++){
      for(var j=0;j<2;j++)
      {
        if(player[j].position[2] >= -8.1 + train[i].position[2])
        {
          if(player[j].position[2] <= 8.1 + train[i].position[2])
          {
            if(player[j].position[0] == train[i].position[0])
            {
              collision = 1;
              //console.log(collision)
            }
          }
        }
      }
    }
  if(collision == 1){
    if(player[0].position[1] < -0.55 || player[1].position[1] < -0.55){
    //  console.log('dead')           //////Game Over//////////////////
      game_over = 1;
    }
    else{
      top = 1;
     // console.log('undead')  ///////////top of train///////////////
    }
  }
  //console.log(player[0].position[1])
  if(top == 1 && collision == 1 && jet_chk == 0){
    player[0].position[1] = -0.5;
    player[1].position[1] = -0.5;
    ////////////going down///////////////
  }
/////////////////////////////////////////////////////////////////////////// barier//////////////////
  for(var j=0;j<2;j++){
    for(var i=0;i<3;i++){
      if(player[j].position[0] == barier[i].position[0]){
        if(player[j].position[2]+10 >= barier[i].position[2]-0.1 && player[j].position[2]+10 <= barier[i].position[2]+0.1){
          if(player[j].position[1] < -1.05 || player[j].position[1] > -0.5){
            console.log('safe');
          }
          else
          {
            console.log(player[0].position[1]);
            if( police[0].position[2] < 0 && police[0].position[2] > -2){
              game_over = 1;

            }
            document.getElementById('polc').play();
            police[0].position[2] = -3;
            police[0].position[0] = player[0].position[0];
           // console.log('dead'+i)  //////////////game over////////////////////
          //  console.log('barrier'+barier[i].position[2])
          }
        }
      }
    }
  }
  ////////////////////////////////////////// barricade////////////////////////////////////
  for(var j=0;j<2;j++){
    for(var i=0;i<3;i++){
      if(player[j].position[0] == barricade[i].position[0]){
        if(player[j].position[2] >= barricade[i].position[2]-0.1 && player[j].position[2] <= barricade[i].position[2]+0.1){
          if(player[j].position[1] > -0.5){
            console.log('safe')
          }
          else
          {
            game_over = 1;
            console.log('hit');
            //console.log('dead'+i)  //////////////game over////////////////////
            //console.log('barrier'+barier[i].position[2])
          }
        }
      }
    }
  }////////////////////
 // console.log(player[1].position[1])
////////////////////////////////////////grass/////////////////////////////////////////////////
for(var j=0;j<2;j++){
  for(var i=0;i<3;i++){
    if(player[j].position[0] == grass[i].position[0]){
      if(player[j].position[2] >= grass[i].position[2]-0.1 && player[j].position[2] <= grass[i].position[2]+0.1){
        if(player[j].position[1] > -0.9){
         // console.log('safe from grass')
        }
        else
        {
          if( police[0].position[2] < 0 && police[0].position[2] > -2){
            game_over = 1;
          }
          document.getElementById('polc').play();
          police[0].position[2] = -3;
          police[0].position[0] = player[0].position[0];
          //console.log('dead from grass'+i)  //////////////game over////////////////////
          //console.log('barrier'+barier[i].position[2])
        }
      }
    }
  }
}
/////////////////////////////////////////////////////////////////// GAME OVER ////////////////////////////
if(game_over){
  document.getElementById('crash').play();
  window.alert("Game Over and your score is: "+ score + " and coins collected :" + coin_ct )
}
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////jetpack//////////////////////////////////////////
for(var j=0;j<2;j++){
   if(player[j].position[0] == jetpack[0].position[0]){
     if(player[j].position[2] >= jetpack[0].position[2]-0.1 && player[j].position[2] <= jetpack[0].position[2]+0.1){
       if(player[j].position[1] >= jetpack[0].position[1]-0.1 && player[j].position[1] <= jetpack[0].position[1]+0.1){
          jetpack[0].position[1] = -3;
         player[0].position[1] = 0.7;
          document.getElementById('prize').play();
          
         player[1].position[1] = 0.7;
         jet_chk = 1;
         //.log('jet');
         jet_time = time_chk;

       }
     }
   }
}
  if(jet_chk == 1 && time_chk == jet_time+60)
  {
      player[0].position[1] = -1;
      player[1].position[1] = -1;
      jet_chk = 0;
  }
  ///////////////////////////bosssssssssssssssssssttttttttttttt///////////////////////
  for(var j=0;j<2;j++){
    if(player[j].position[0] == boost[0].position[0]){
      if(player[j].position[2] >= boost[0].position[2]-0.1 && player[j].position[2] <= boost[0].position[2]+0.1){
        if(player[j].position[1] >= boost[0].position[1]-0.1 && player[j].position[1] <= boost[0].position[1]+0.1){
          document.getElementById('prize').play();
           boost[0].position[1] = -3;
          player[0].position[1] = 0.7;
          player[1].position[1] = 0.7;
          speed = 1.0;
          jet_chk = 1;
         // console.log('jet');
          jet_time = time_chk;
 
        }
      }
    }
 }
   if(jet_chk == 1 && time_chk == jet_time+10)
   {
       player[0].position[1] = -1;
       player[1].position[1] = -1;
       speed = 0.05;
       jet_chk = 0;
   }
  ////////////////////////jumper///////////////////////////////////////////////////////

  for(var j=0;j<2;j++){
    if(player[j].position[0] == jumper[0].position[0]){
      if(player[j].position[2] >= jumper[0].position[2]-0.1 && player[j].position[2] <= jumper[0].position[2]+0.1){
        if(player[j].position[1] <= -0.9 && player[j].position[1] >= -1.1){
          jump_height = 0.5;
          document.getElementById('prize').play();

          shoe_taken = 1;
       //   console.log(100)
          shoe_time = time_chk;
          jumper[0].position[1] = -3;
 
        }
      }
    }
 }
   if(shoe_taken == 1 && time_chk == shoe_time + 60)
   {
        jump_height = -0.3;
        shoe_taken = 0;

   }

  ////////////////////////////////////////////////////////////////coin///////////////////////////////////////////

}
function coin_collisiion(coin,player){
  return (coin.position[2]+0.1 >= player.position[2] && coin.position[2]-0.1 <= player.position[2]) &&
  (coin.position[1]+0.1 >= player.position[1]-0.2 && coin.position[1]-0.1 <= player.position[1]+0.2) &&
  (coin.position[0]+0.1 >= player.position[0]-0.4 && coin.position[0] - 0.1<= player.position[0]+0.4);
}

  function tick(){
     train[0].position[2]+= 0.2;
     train[1].position[2]+= 0.2;
     train[2].position[2]+= 0.2;

    track[0].position[2] += speed;
    track[1].position[2] += speed;
    track[2].position[2] += speed;
    track[3].position[2] += speed;
    // console.log("obs",obstacle[2].position[2]);
     barier[0].position[2] += speed;
     barier[1].position[2] += speed;
     barier[2].position[2] += speed;

     barricade[0].position[2] += speed;
     barricade[1].position[2] += speed;
     barricade[2].position[2] += speed;

     grass[0].position[2] += speed;
     grass[1].position[2] += speed;
     grass[2].position[2] += speed;

    jetpack[0].position[2] += speed;

    boost[0].position[2] += speed;

    jumper[0].position[2] += speed;

    police[0].position[2] += 0.01;
    police[0].position[0] = player[0].position[0];
    for(var i=0;i<coin.length;i++)
    {
     coin[i].position[2] += speed;
    }

    dog[0].position[2] += 0.0;
    dog[0].position[0] = player[0].position[0];

    dog[1].position[2] += 0.0;
    dog[1].position[0] = player[0].position[0];
    

     sidewall[0].position[2] += speed;
     leftwall[0].position[2] += speed;
     sidewall[1].position[2] += speed;
     leftwall[1].position[2] += speed;
     sidewall[2].position[2] += speed;
     leftwall[2].position[2] += speed;
     sidewall[3].position[2] += speed;
     leftwall[3].position[2] += speed;

    // obstacle[2].position[2] += 0.05;
    // player[0].position[2] -= 0;
    if(jump == 1){
      for(var i=0;i<2;i++){
        if(player[i].position[1] < jump_height){
          player[i].position[1] += 0.02;
        }
        else{
          jump = 0;
        }
      }
      
    }
  
    //console.log(player[1].position[1])
    
    if(jump == 0 && player[0].position[1] > -1 && jet_chk == 0){
      for(var i=0;i<2;i++){
        if(player[i].position[1] > -1){
          player[i].position[1] -= 0.02;
        }
        else{
          player[0].position[1] = -1
          player[1].position[1] = -1
        }
      }
    }
  
     if(crouch == 1){
       for(var i=0;i<2;i++){
         if(player[i].position[1] > -1.5){
           player[i].position[1] -= 0.025;
         }
         else{
           crouch = 0;
         }
       }
     }
     if(crouch == 0){
       for(var i=0;i<2;i++){
         if(player[i].position[1] < -1){
           player[i].position[1] += 0.02;
         }
         else{
           crouch = 2;
           player[0].position[1] = -1
           player[1].position[1] = -1
         }
       }
     }

    if(track[0].position[2]>=30)
    {
      track.push({
        buffer: initTracks(gl),
        draw: drawTrack,
        position: [0.0, -1.0, track[2].position[2]-30],
      });
      track.shift();
      scene_pos -= 15;

    }
    if(sidewall[0].position[2]>=30)
    {
      sidewall.push({
        buffer: initSidewall(gl),
        draw: drawSidewall,
        position: [2, -1.0, sidewall[2].position[2]-30],
      });
      sidewall.shift();
    }
    if(leftwall[0].position[2]>=30)
    {
      leftwall.push({
        buffer: initLeftwall(gl),
        draw: drawLeftwall,
        position: [-2, -1.0, leftwall[2].position[2]-30],
      });
      leftwall.shift();

    }

    var shift_j = Math.floor((Math.random() * 3) + 0);
    if(jetpack[0].position[2] >= 30)
    {
      if(shift_j == 0)
      {
        shift_j = 1.2;
      }
      else if(shift_j == 1)
      {
        shift_j = -1.2;
      }
      else{
        shift_j = 0.0
      }
      jetpack.push({
        buffer: initJetpack(gl),
        draw: drawJetpack,
        position: [shift_j, -1.0, -30],
      });
      jetpack.shift();

    }
    if(jumper[0].position[2] >= 30)
    {
      if(shift_j == 0)
      {
        shift_j = 1.2;
      }
      else if(shift_j == 1)
      {
        shift_j = -1.2;
      }
      else{
        shift_j = 0.0
      }
      jumper[0].position[2] = -45;
      jumper[0].position[0] = shift_j;

    }
    if(boost[0].position[2] >= 30)
    {
      if(shift_j == 0)
      {
        shift_j = 1.2;
      }
      else if(shift_j == 1)
      {
        shift_j = -1.2;
      }
      else{
        shift_j = 0.0
      }
      
      jumper[0].position[2] = -60;
      jumper[0].position[0] = shift_j;
    }




    var shift = Math.floor((Math.random() * 3) + 0);
    
    for(var i=0;i<3;i++)
    {
      
      if(shift == 0)
      {
        shift = 1.2;
      }
      else if(shift == 1)
      {
        shift = -1.2;
      }
      else{
        shift = 0.0
      }
      if(barier[i].position[2]>=20)
      {
        barier.push({
          buffer: initBarier(gl),
          draw: drawBarier,
          position: [shift, -1.0,-30],
        });
        barier.shift();
        scene_pos -= 15;
      }
    }
    //var shift_coin = Math.floor((Math.random() * 3) + 0);
    //var shift_h = Math.floor((Math.random() * 2) + 0);
    // for(var i=0;i<10;i++){
    //   if(shift_coin == 0)
    //   {
    //     shift_coin = 1.2;
    //   }
    //   else if(shift_coin == 1)
    //   {
    //     shift_coin = -1.2;
    //   }
    //   if(shift_h == 0)
    //   {
    //     shift_h = -0.9;
    //   }
    //   else if(shift_h == 1)
    //   {
    //     shift_h = 1;
    //   }
    //   if(coin[i].position[2]>=30)
    //   {
    //     coin.push({
    //       buffer: initCoin(gl),
    //       draw: drawCoin,
    //       position: [shift_coin, shift_h, -30],
    //     });
    //     //coin.shift();
    //   }
    // }

    var shift_b = Math.floor((Math.random() * 3) + 0);
    for(var i=0;i<3;i++)
    {
      
      if(shift_b == 0)
      {
        shift_b = 1.2;
      }
      else if(shift_b == 1)
      {
        shift_b = -1.2;
      }
      else{
        shift_b = 0.0
      }
      if(barricade[i].position[2]>=30)
      {
        barricade.push({
          buffer: initBarricade(gl),
          draw: drawBarricade,
          position: [shift, -1.0, -30],
        });
        barricade.shift();
      }

      if(grass[i].position[2]>=30)
      {
        grass.push({
          buffer: initGrass(gl),
          draw: drawGrass,
          position: [shift, -1.0, -30],
        });
        grass.shift();
      }
    }

    var shift_t = Math.floor((Math.random() * 3) + 0);
    for(var i=0;i<3;i++)
    {
      if(shift_t == 0)
      {
        shift_t = 1.2;
      }
      else if(shift_t == 1)
      {
        shift_t = -1.2;
      }
      else{
        shift_t = 0.0
      }
      if(train[i].position[2]>=40)
      {
        train.push({
          buffer: initTrain(gl),
          draw: drawTrain,
          position: [shift, -1.0, -35],
        });
        train.shift();
      }
    }
    if(jetpack[0].position[2]>=30)
    {
      jetpack.push({
        buffer: initJetpack(gl),
        draw: drawJetpack,
        position: [0.0, -1.0, -35],
      });
      jetpack.shift();
    }




  }
  initialize();

  function input()
  {
    document.onkeyup = function(e) {
      switch (e.keyCode) {
          case 65:
              for(var i=0;i<2;i++){
                if(player[i].position[0] == 0.0)
                {
                player[i].position[0] = -1.2;
                }
                if(player[i].position[0] == 1.2)
                {
                  player[i].position[0] = 0.0;
                }
                
              }
              break;
          
          case 68:
              for(var i=0;i<2;i++){
                if(player[i].position[0] == 0.0)
                {
                player[i].position[0] = 1.2;
                }
                if(player[i].position[0] == -1.2)
                {
                player[i].position[0] = 0.0;
                }    
              } 
              break;
          
          case 87:
          //console.log(11)
              jump = 1;
              break;
          case 83:
              if(jet_chk == 0){
                crouch = 1;
              }
      }
    };
  }

  function render(now) {
    start = new Date();
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    time_chk = Math.floor(now * 3)
    //console.log(time_chk)
    gl.clearColor(0.0, 191.0, 255.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    score++;
    if(score%100 == 0){
      flash = 0.1;
    }
    if(score == 300){
      flash = 0.2
    }

    if(score == 600){
      flash = 0.4
    }
    if(score == 900){
      flash = 0.6
    }
    if(score == 1200){
      flash = 0.8
    }
    if(score == 1500){
      flash = 0.9
    }
    

    document.getElementById('score').innerHTML='Distance: ' + score + 'm';
    document.getElementById('level').innerHTML='Coins: ' + coin_ct;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    tick();
    collisions();
    // console.log(track.length);
    input();
    drawTrack(gl, programInfo, track[0], texture, deltaTime);
    drawTrack(gl, programInfo, track[1], texture, deltaTime);
    drawTrack(gl, programInfo, track[2], texture, deltaTime);
    drawTrack(gl, programInfo, track[3], texture, deltaTime);
    // drawTrack(gl, programInfo, wall[0], ad, deltaTime);    
     drawBarier(gl, programInfo, barier[0], ad, deltaTime);
     drawBarier(gl, programInfo, barier[1], ad, deltaTime);
     drawBarier(gl, programInfo, barier[2], ad, deltaTime);

     drawBarricade(gl, programInfo, barricade[0], barricade_texture, deltaTime);
     drawBarricade(gl, programInfo, barricade[1], barricade_texture, deltaTime);
     drawBarricade(gl, programInfo, barricade[2], barricade_texture, deltaTime);

     drawGrass(gl, programInfo, grass[0], grass_texture, deltaTime);
     drawGrass(gl, programInfo, grass[2], grass_texture, deltaTime);
     drawGrass(gl, programInfo, grass[2], grass_texture, deltaTime);
     for(var i=0;i<coin.length;i++)
     {
        drawCoin(gl, programInfo, coin[i], coin_t, 0.01);
     }

     drawJetpack(gl, programInfo, jetpack[0], jet, deltaTime);

     drawBoost(gl, programInfo, boost[0], board, deltaTime);

     drawJumper(gl, programInfo, jumper[0], shoe, deltaTime);


     drawPolice(gl, programInfo, police[0], police_body, police_leg, police_leg, police_hair, deltaTime);

     
      if( time_chk%2 == 0)
      {
        drawPlayer(gl, programInfo, player[1], back, arms, leg, hair, deltaTime);
        drawDog(gl, programInfo, dog[0], doggie, deltaTime);
        
      }
      else
      {
        drawPlayer2(gl, programInfo, player[0], back, arms, leg, hair, deltaTime);
        drawDog(gl, programInfo, dog[1], doggie, deltaTime);
        
      }
      for(var j=0;j<2;j++){
        for(var i=0;i<coin.length;i++){
          //console.log('x ' + coin[i].position[0])
          //console.log('y ' + coin[i].position[1])
          //console.log('z ' + coin[i].position[2])
            if(coin_collisiion(coin[i],player[j])){
              document.getElementById('coin').play();
              coin.splice(i,1);
              coin_ct += 1;
            //  console.log(coin.length);
            }
          }
        }
        for(var i=0;i<coin.length;i++){
          if(coin[i].position[2] >= 10){
            coin.splice(i,1);
          }
        }
        if(coin.length < 1){     
         
          var shift_coin = Math.floor((Math.random() * 3) + 0);
          var shift_h = Math.floor((Math.random() * 2) + 0);
          var other;
             if(shift_coin == 0)
             {
               shift_coin = 1.2;
               other = -1.2
             }
             else if(shift_coin == 1)
             {
               shift_coin = -1.2;
               other = 0;
             }
             if(shift_h == 0)
             {
               shift_h = 1;
             }
             else if(shift_h == 1)
             {
               shift_h = 1;
             }
            for(i=0;i<30;i++){
            coin.push({
              buffer : initCoin(gl),
              draw: drawCoin,
              position:[shift_coin,-0.9 ,-i-16],
            });
            }
            for(i=0;i<30;i++){
              coin.push({
                buffer : initCoin(gl),
                draw: drawCoin,
                position:[other,-0.5 ,-i-16],
              });
              }
        }
      //  console.log(player[0].position[0])
     drawSidewall(gl, programInfo, sidewall[0], side_wall, deltaTime);
     drawLeftwall(gl, programInfo, leftwall[0], left_wall, deltaTime);
     drawSidewall(gl, programInfo, sidewall[1], side_wall, deltaTime);
     drawLeftwall(gl, programInfo, leftwall[1], left_wall, deltaTime);
     drawSidewall(gl, programInfo, sidewall[2], side_wall, deltaTime);
     drawLeftwall(gl, programInfo, leftwall[2], left_wall, deltaTime);
     drawSidewall(gl, programInfo, sidewall[3], side_wall, deltaTime);
     drawLeftwall(gl, programInfo, leftwall[3], left_wall, deltaTime);
    // drawObstacle(gl, programInfo, obstacle[2], ad, deltaTime);    
     drawTrain(gl, programInfo, train[0], train_texture, deltaTime);
     drawTrain(gl, programInfo, train[1], train_texture, deltaTime);
     drawTrain(gl, programInfo, train[2], train_texture, deltaTime);
    // drawPlayers(gl, programInfo, player[0], deltaTime);
    var GrayBuffer = gl.getUniformLocation(programInfo.program, "uGray");
    gl.uniform1i(GrayBuffer, gray);
    var FlashBuffer = gl.getUniformLocation(programInfo.program, "uFlash");
    gl.uniform1f(FlashBuffer, flash);  
    if(flash>0)
      flash-=0.01;
    else
      flash=0;
    requestAnimationFrame(render);

  }
  requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
