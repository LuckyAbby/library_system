'use strict';
exports.html={
	begin:
	`<html>
		<head>
			<META HTTP-EQUIV="Content-Type" Content="text-html; charset=utf-8">
			<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
			<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
		</head>
		<body>
		<h3>结果展示</h3>
		<hr color="#e3e3e3">
		<style>
		body {
      font-size: 16px;
      margin: 2px 2px 2px 2px;
      font-family: "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }
		p{
			margin:5px;
			color: #f1147d;
		}
		</style>`,
	end:'</body></html>'
};

exports.StrTime=function(D,fmt)
{//Date转换为字串表达(D=Date或Date的字串,fmt=格式，目前只支持"yyyy,mm,dd,hh,nn,ss"几个符号)
	if(String==D.constructor || Number==D.constructor)
		D=new Date(D);
	var d=(100000000+10000*D.getFullYear()+100*(D.getMonth()+1)+D.getDate()).toString();
	var t=(1000000+10000*D.getHours()+100*D.getMinutes()+D.getSeconds()).toString();
	return fmt.replace("yyyy",d.substr(1,4)).replace("mm",d.substr(5,2)).replace("dd",d.substr(7,2)).replace(
		"hh",t.substr(1,2)).replace("nn",t.substr(3,2)).replace("ss",t.substr(5,2)).replace("yy",d.substr(3,2));
};
