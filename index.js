
var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
			
var addtext=document.getElementById('addtext')


//文字取色模块
var canvas2=document.getElementById('canvas2');
var ctx2=canvas2.getContext('2d');

//先画上一个简单的图吧。。粗暴渐变
var linear_gra=ctx2.createLinearGradient(0,0,300,300);
linear_gra.addColorStop(0,'white');
linear_gra.addColorStop(1/7,'red');
linear_gra.addColorStop(2/7,'orange');
linear_gra.addColorStop(3/7,'yellow');
linear_gra.addColorStop(4/7,'green');
linear_gra.addColorStop(5/7,'blue');
linear_gra.addColorStop(6/7,'purple');
linear_gra.addColorStop(1,'black');

ctx2.fillStyle=linear_gra;
ctx2.beginPath();
ctx2.fillRect(0,0,300,300);

var canvas3=document.getElementById('canvas3');
var ctx3=canvas3.getContext('2d');
canvas3.style.height='100px';

/* 更加精确的，，但是现在写的有点晕。。不知道怎么算。。心态崩了
for (var i=0;i<300;i++){
    for (var j=0;j<300;j++){
      ctx2.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' + 
                       Math.floor(255-42.5*j) + ',0)';
      ctx2.fillRect(j*1,i*1,1,1);
    }
}
*/


var color = document.getElementById('color');

function pick(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  var pixel = ctx2.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + (data[3] / 255) + ')';
  color.style.background = rgba;
  color.textContent = rgba;
  console.log(rgba,x,y)
  ctx.fillStyle=rgba;

}
canvas2.addEventListener('click', pick);



//获取文本输入框的内容
//文字写入&文字删除
 var Confirm=document.getElementById('confirm');
 var Cancel=document.getElementById('cancel')
//写入文字
Confirm.addEventListener('click',function(){
	var txt=document.getElementById('addtext').value;	
	console.log(txt);


	//文字样式的设置
	//test
	var pos_x=document.getElementById('pos_x').value;
	var pos_y=document.getElementById('pos_y').value;
	var txt_rot=document.getElementById('txt_rot').value;
	var font=document.getElementById('fonter').value;
	console.log(pos_x,pos_y,txt_rot);
	ctx.save();
	ctx.font = 'bold '+font+'px Arial';
	ctx.rotate(Math.PI*txt_rot/180);
	console.log(Math.PI*txt_rot/180);
	ctx.fillText(txt,pos_x,pos_y);

})

//删除文字部分
//不知道该怎样只把文字给删掉而不断删掉整个图片
Cancel.addEventListener('click',function(){
	console.log("laji")
	ctx.clearRect(0,0,1000000,1000000)
})



//上传和下载按钮
var but1=document.getElementById('upload');			
var btn2=document.getElementById('download');

//上传图片模块


var pic1=document.getElementById('uppic').value;
console.log(pic1)

  function readAsDataURL(){
    //检验是否为图像文件
   	document.getElementById('read_pic_but').className+='button'
    var file = document.getElementById("uppic").files[0];
    if(!/image\/\w+/.test(file.type)){
        alert('图片');
        return false;
    }
    var reader = new FileReader();
    //将文件以Data URL形式读入页面
    reader.readAsDataURL(file);
    reader.onload=function(e){
        var picture=this.result;
       
       	var pic=new Image();
       	pic.src=picture;    
       	ctx.drawImage(pic,0,0)

    }
}


//下载模块
btn2.addEventListener('click',function(){
	var type='jpg';
	download(type)
})
//图片下载操作,指定图片类型
function download(type) {

    //设置保存图片的类型
    var imgdata = canvas.toDataURL(type);
    
    //将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
    
    //将图片保存到本地
    var saveFile = function (data, filename) {
        var link = document.createElement('a');
        link.href = data;
        link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
       
        console.log(canvas.width,canvas.height)
    }
    var filename = new Date().toLocaleDateString() + '.' + type;
    saveFile(imgdata, filename);
}