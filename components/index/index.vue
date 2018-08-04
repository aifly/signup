<template>
	<div class="lt-full zmiti-index-main-ui "  :class="{'show':show}">
		<div class="zmiti-title">
			<div class="zmiti-index-logo">
				<img :src="imgs.logo" alt="">
			</div>
			<img @touchstart='imgStart' :src="imgs.title">
		</div>
		<div class="zmiti-nav">
			<ul>
				<li v-for="(menu,i) in menus" :key="i" v-tap='[menuClick,i]'>
					<div>
						<img :style="{width:menu.width}" :src="menu.defaultImg" alt="">
					</div>
					<div :class="menu.class">{{menu.name}}</div>
				</li>
			</ul>
		</div>

		<section class="lt-full zmiti-qd-mask" v-show='showQD'>
			<div>
				<img :src="imgs.qiandaoBg" alt="">
				<div class="zmiti-qd-info">
					<div>
						请打开微信扫一扫
					</div>
					<div>
						扫描签到二维码即可成功签到
					</div>
					<div class="zmiti-btn" v-tap='[close]'>关 闭</div>
				</div>
			</div>
		</section>

		<div v-if='mynumberinfo' class="lt-full zmiti-num-mask">
			<div>
				<div class="zmiti-number">{{mynumberinfo}}</div>
				<div class="zmiti-number" style="text-align:center;">{{mynumber}}</div>
				<div class="zmiti-btn" v-tap='[closeInfo]'>关 闭</div>
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	export default {
		props:['obserable','nickname','pv'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:false,
				showMasks:false,
				viewW:window.innerWidth,
				mynumber:"",
				mynumberinfo:"",
				showQD:false,//显示签到提示
				menus:[
					{
						name:"报名",
						img:imgs.baoming,
						defaultImg:imgs.baoming,
						img1:imgs.yibaoming,
						width:'60px'
					},{
						name:"签到",
						img:imgs.qiandao,
						defaultImg:imgs.qiandao,
						img1:imgs.qiandao1,
						width:'65px'
					},{
						name:"须知",
						img:imgs.xuzhi,
						defaultImg:imgs.xuzhi,
						img1:imgs.xuzhi1,
						width:'65px'
					},{
						name:"公告",
						img:imgs.gonggao,
						defaultImg:imgs.gonggao,
						img1:imgs.gonggao1,
						width:'65px'
					},{
						name:"住宿",
						img:imgs.zhusu,
						defaultImg:imgs.zhusu,
						img1:imgs.zhusu1,
						width:'68x'
					},{
						name:"课程",
						img:imgs.kecheng,
						defaultImg:imgs.kecheng,
						img1:imgs.kecheng1,
						width:'54px'
					},{
						name:"座位",
						img:imgs.zuowei,
						defaultImg:imgs.zuowei,
						img1:imgs.zuowei1,
						width:'60px'
					},{
						name:"交流",
						img:imgs.jiaoliu,
						defaultImg:imgs.jiaoliu,
						img1:imgs.jiaoliu1,
						width:'70px'
					},{
						name:"资料",
						img:imgs.ziliao,
						defaultImg:imgs.ziliao,
						img1:imgs.ziliao1,
						width:'60px'
					}/* ,{
						name:"通讯录",
						img:imgs.tongxunlu,
						defaultImg:imgs.tongxunlu,
						img1:imgs.tongxunlu1,
						width:'50px'
					} */,{
						name:"搜索",
						img:imgs.sousuo,
						defaultImg:imgs.sousuo,
						img1:imgs.sousuo1,
						width:'55px'
					}
				],
				
			}
		},
		components:{
		},
		
		methods:{

			closeInfo(){
				this.mynumber = '';
				this.mynumberinfo = '';
			},

			imgStart(e){
				e.preventDefault(); 
			},
			close(){
				this.showQD = false;
			},
			menuClick(index){
				var {obserable } =this;
				switch (index) {
					case 0:
						if(!this.isBaoMing){

							obserable.trigger({
								type:'showForm'
							})
						}
						break;
				
					case 1://签到
						if(!this.issign && this.isBaoMing){
							this.showQD = true;
						}
					break;
					case 2:
					break;
					case 3:
					break;
					case 4:
						
						if(this.isBaoMing){

							this.mynumberinfo = '我的房间号是：'	
							this.mynumber = this.userinfo.roomnumber||'未分配';
						}
					break;
					case 5:
					break;
					case 6:
						if(this.isBaoMing){
							this.mynumberinfo = '我的座位号是：'	
							this.mynumber = this.userinfo.seatnumber||'未分配';
						}
					break;
					case 7:
					break;
					case 8:
					break;
					case 9:
					break;
					case 10:
					if(this.isBaoMing){
						obserable.trigger({
							type:'showSearch'
						})
					}
					break;
				}
			}
	 
		},
		mounted(){


			var {obserable} = this;

			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			});

		
		
			obserable.on('signin',()=>{
				s.issign = true;
				s.menus[1].defaultImg = s.menus[1].img1;
				s.menus[1].name = '已签到';
				s.menus[1].class = 'grey'

				s.menus.forEach((item,i)=>{
					if(i>1){
						item.defaultImg = item.img;
						item.class = ''
					}
				});
			})
			 
		}
	}
</script>