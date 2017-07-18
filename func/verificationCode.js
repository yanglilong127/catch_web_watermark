//制作验证码
//有问题


const fs=require('fs');
const express=require('express');
const ccap=require('ccap');
const captcha=ccap();

const server=express();

server.get('/yanz',(req,res)=>{
	var ary=captcha.get();
	var txt=ary[0];
	var buf=ary[1];
	res.send(buf);
	console.log(txt);
});

server.listen(8082,(err)=>{
	if(err)
		throw err;
	console.log('成功监听8082端口');
});