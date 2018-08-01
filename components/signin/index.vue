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
				this.showQdSuccess = true;
			},
			back(){
				this.show  = false;
				this.showQdSuccess = false;
			}
			
		},
	
		mounted() {
			

			var {obserable} = this;
			obserable.on('showFriend',()=>{
				this.show = true;
			})
		}
	
	}
</script>