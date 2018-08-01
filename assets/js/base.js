var imgs = {
	play: './assets/images/play.png',
	logo: './assets/images/logo.png',
	baoming:'./assets/images/baoming.png',
	yibaoming:'./assets/images/yibaoming.png',
	gonggao:'./assets/images/gonggao.png',
	gonggao1:'./assets/images/gonggao1.png',
	jiaoliu:'./assets/images/jiaoliu.png',
	jiaoliu1:'./assets/images/jiaoliu1.png',
	kecheng:'./assets/images/kecheng.png',
	kecheng1:'./assets/images/kecheng1.png',
	qiandao:'./assets/images/qiandao.png',
	qiandao1:'./assets/images/qiandao1.png',
	tongxunlu:'./assets/images/tongxunlu.png',
	tongxunlu1:'./assets/images/tongxunlu1.png',
	xuzhi:'./assets/images/xuzhi.png',
	xuzhi1:'./assets/images/xuzhi1.png',
	zhusu:'./assets/images/zhusu.png',
	zhusu1:'./assets/images/zhusu1.png',
	ziliao:'./assets/images/ziliao.png',
	ziliao1:'./assets/images/ziliao1.png',
	zuowei:'./assets/images/zuowei.png',
	sousuo:'./assets/images/sousuo.png',
	sousuo1:'./assets/images/sousuo.png',
	zuowei1:'./assets/images/zuowei1.png',
	success:'./assets/images/success.png',


	title:'./assets/images/title.jpg',
	qd:'./assets/images/qd.jpg',
	qiandaoBg:'./assets/images/qiandao-bg.png',
	baomingTitle:'./assets/images/baoming-title.jpg',
}
 var arr = [];


 for (var attr in imgs) {
 	arr.push(imgs[attr]);
 }


var musics = {
	music: {
		src: './assets/music/bg2.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	},
	photo:{
		src:'./assets/music/photo.mp3',
		autoplay:false,
		name:"photo",
		loop:false
	}
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();