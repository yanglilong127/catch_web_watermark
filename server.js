//抓去网页所有图片以及网页链接地址

const cheerio=require('cheerio');
const http=require('http');
const fs=require('fs');
const os=require('os');

function download(url,callback){
	//http.get 方法会自动调用req.end()方法
	http.get(url,function(res){
		var data='';
		res.on('data',(chunk)=>{
			data+=chunk;
		});

		res.on('end',(err)=>{
			callback(data);
		});

	});
};

var url='http://www.ivsky.com/';

var fWriteName='imgPath.text';
var fWrite=fs.createWriteStream(fWriteName);

download(url,function(data){
	if(data){
		var $=cheerio.load(data);
		var html=$('html').html();  //获取所有html内容
		//匹配网址
		var rep=/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/ig;
		//console.log(url.match(rep));
		$('img').each(function(i,elem){
			var imgSrc=$(this).attr('src');
			fWrite.write(imgSrc+os.EOL);
			http.get(imgSrc,function(res){
				var imgData='';
				//所获取的数据的二进制数据，所以一定要设置编码格式为binary，
				//因为writeFile的默认编码格式为utf-8，
				//否则保存的图片无法打开。
				res.setEncoding('binary');
				res.on('data',(chunk)=>{
					imgData+=chunk;
				});
				res.on('end',(err)=>{
					var imgPath='/'+i+'.'+imgSrc.split('.').pop();
					fs.writeFile(__dirname+'/imgs'+imgPath,imgData,'binary',(err)=>{
						if(err)
							console.log(err);
					});
				});
			});
		});
	}
});
