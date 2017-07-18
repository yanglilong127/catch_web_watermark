//添加水印方法,给原图片上添加水印图片

const images=require('images');

/**参数
** sourceSrc |string   原图片地址
** waterSrc  |string   水印图片地址
** position  |int      水印添加的位置
*1--上左角  2--上中  3--上右  4--中左  5--中中  6--中右  7--下左 8--下中 9--下右
** savePath  |string   保存地址
***/
function addWaterMark(sourceSrc,waterSrc,position,savePath){
	var watermarkImg=images(waterSrc);  //加载水印图片
	var sourceImg=images(sourceSrc);    //原图片地址
	var sWidth=sourceImg.width();       //获取原图片宽度
	var sHeight=sourceImg.height();	 	//获取原图片高度
	var wWidth=watermarkImg.width();       //获取水印图片宽度
	var wHeight=watermarkImg.height();	 	//获取水印图片高度
	if(wWidth+5>sWidth || wHeight+5>sHeight){ //如果水印图片宽高度大于原图
		return;                          //返回不添加水印
	}
	var left,top;// 水印位置
	switch(position){
		case 1:      //上左角
			left=5;
			top=5;
			break;
		case 2:      //上中角
			left=(sWidth-wWidth)/2;
			top=5;
			break;
		case 3:      //上右角
			left=sWidth-wWidth-5;
			top=5;
			break;
		case 4:      //中左角
			left=5;
			top=(sHeight-wHeight)/2;
			break;
		case 5:      //中中角
			left=(sWidth-wWidth)/2;
			top=(sHeight-wHeight)/2;
			break;
		case 6:      //中右角
			left=sWidth-wWidth-5;
			top=(sHeight-wHeight)/2;
			break;
		case 7:      //下左角
			left=5;
			top=sHeight-wHeight-5;
			break;
		case 8:      //下中角
			left=(sWidth-wWidth)/2;
			top=sHeight-wHeight-5;
			break;
		case 9:      //下右角
			left=sWidth-wWidth-5;
			top=sHeight-wHeight-5;
			break;
		default:
			left=sWidth-wWidth-5;
			top=sHeight-wHeight-5;
	}
	sourceImg
	.draw(watermarkImg,left,top)
	.save(savePath);

}



/****8
images('../images/a.png')   //图片源地址
	.size(400)          	//等比缩放图像到400像素宽
	.draw(images('../images/alpha.fw.png'),10,10)  //在(10,10)处绘制Logo 
	.save('../images/saving.jpg',{ 		//保存图片到文件,图片质量为50 
		quality:50
	});
*****/

module.exports={
	addWaterMark
}