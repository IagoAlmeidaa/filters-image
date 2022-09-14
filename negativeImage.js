const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function negativergb(pixel) {
  return 255 - pixel;
}

function logarithmicRgb(pixel,{constant}) {
  return constant*Math.log(pixel + 1);
}

function potencia(pixel,{gama,constant}){
  return constant*Math.pow(pixel,gama)
} 

function bitplaneSlicing(pixel, { bitplane }) {
  return pixel >> bitplane & 1;
}

function transformImage(data, func,options) {
  for (var t = 0; t < data.length; t += 4) {
    data[t] = func(data[t],options);
    data[t + 1] = func(data[t + 1],options);
    data[t + 2] = func(data[t + 2],options);
  }
}

function getMax(arr) {
  return arr.reduce((max, v) => max >= v ? max : v, 0);
}

const sobel_v =
[
  -1.0, 0.0, +1.0,
  -2.0, 0.0, +2.0,
  -1.0, 0.0, +1.0
];

const sobel_h =
[
  -1.0, -2.0, -1.0,
   0.0,  0.0,  0.0,
  +1.0, +2.0, +1.0
];

const maskTest =
[
  100.0, 2.0, 1.0,
   2.0,  4.0,  20.0,
  +10.0, +2.0, +1.0
];
var imageObj = new Image();


function transformImage(){
  var canvasColor = context.getImageData(0, 0, imageObj.width, imageObj.height);
  
  const c = 255/Math.log(1+getMax(canvasColor.data))
  console.log("c",canvasColor)
  console.log("c",canvasColor)
  medianFilter(canvasColor.data,{mask:maskTest,width:imageObj.width,height:imageObj.height})
 //laplacian(canvasColor.data,{mask:sobel_h,width:imageObj.width})
//transformImage(canvasColor.data, laplacian,{mask:sobel_h,width:imageObj.width});
  context.putImageData(canvasColor, 0, 0);
}

function addImageInCanvas(url){

  imageObj.onload = function () {
    canvas.width = imageObj.width
    canvas.height = imageObj.height
    context.drawImage(imageObj, 0, 0);
    transformImage()
  };
  imageObj.src = url;
  
}
