//批处理添加水印方法

const path=require('path');
const fs=require('fs');
const shuiyin=require('./watermark_image.js');
//shuiyin.addWaterMark('./images/a.png','./images/alpha.fw.png',5,'./images/sav.jpg');

/**
 * imgDir |string  待批处理的图片文件夹
**/
function batchProcess(imgDir){
	fs.stat(imgDir,function(err,sta){
		if(!sta)
			return;
		var paths=fs.readdirSync(imgDir);
		paths.forEach(function(file){
			var src=imgDir+'/'+file;
			var dst=path.join(imgDir+'/../after_watermark/')+file;
			shuiyin.addWaterMark(src,'../images/alpha.fw.png',5,dst);
		});
	});
}

batchProcess(path.join(__dirname+'/../imgs'));