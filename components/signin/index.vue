<template>
	<transition name='main'>
	
		<div class="lt-full zmiti-signin-main-ui " :class="{'show':show}"  ref='page'>
			<div>
				<img :src="imgs.qd" alt="">
			</div>

			<div v-tap='[signin]' class="zmiti-qd-btn" @touchstart='isPress = true' @touchend='isPress = false' :class="{'active':isPress}">
				点击打卡
			</div>

			<div class="lt-full zmiti-signin-success" v-if='showQdSuccess'>
				<div>
					<div>
						<img :src="imgs.success" alt="">
						<div style="height:30px;"></div>
						<div>签到成功</div>
					</div>
					<div class="zmiti-btn" v-tap='[back]'>
						返回
					</div>
				</div>
			</div>
		</div>
	
	</transition>
</template>

<script>
	import './index.css';
	
	import {
	
		imgs
	
	} from '../lib/assets.js';

	import IScroll from 'iscroll';
	
	import $ from 'jquery';
	
	import zmitiUtil from '../lib/util';

	export default {
	
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
	
		name: 'zmitiindex',
	
		data() {
	
			return {
				imgs,
				showTeam: false,
				showQrcode: false,
				show: false,
				viewW: window.innerWidth,
				viewH: window.innerHeight,
				showMasks: false,
				isPress:false,
				showQdSuccess:false
			}
		},
	
		components: { 
		},
		methods: {
			restart() {
				window.location.href = window.location.href.split('?')[0];
			},
			signin(){//打卡
				var {obserable} = this;
				var s = this;
				$.ajax({
					url:window.baseUrl+'/wenming/signin/',
					type:'post',
					data:{
						pnumber:window.pNumber,
						wxopenid:window.openid
					},
					success(data){
						if(data.getret === 0){
							s.showQdSuccess = true;
							obserable.trigger({
								type:'signin'
							})
						}else{

						}
					}
				})
				//this.showQdSuccess = true;
			},
			back(){
				this.show  = false;
				this.showQdSuccess = false;

			}
			
		},
	
		mounted() {
			

			var {obserable} = this;
			var s = this;
			obserable.on('showQD',()=>{


				$.ajax({
				url:window.baseUrl+'/wenming/getsignuplist/',
				type:'post',
				data:{
					wxopenid:window.openid
				},
				success(data){
					if(data.getret === 0 ){
						
						if(data.list.length<=0){

							return;
						}
						else{
							s.show = true;
							if(!window.openid || data.list[0].status !== 1){//没有审核通过
								s.show = false;
							}
						}
						 
					}
					console.log(data);
				}
			})



				
			})
		}
	
	}
</script>