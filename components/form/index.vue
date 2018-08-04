<template>
	<transition name='main'>
		<div class="zmiti-form-main-ui lt-full" :class="{'show':show}">
			<div>
				<img :src="imgs.baomingTitle" alt="">
			</div>
			<div class="zmiti-form-item">
				<label for="">姓名</label><input placeholder="请填写姓名" type="text" v-model="formUser.username">
			</div>
			<div class="zmiti-form-item select"  :data-content="formUser.sex !== '' ? '' :'请选择性别'">
				<label for="">性别</label><select v-model="formUser.sex">
					<option :value="1">--请选择--</option>
					<option :value="1">男</option>
					<option :value="0">女</option>
				</select>
				<span>{{formUser.sex === 1 ? '男':formUser.sex === 0 ? '女': ''}}</span>
			</div>
			<div class="zmiti-form-item">
				<label for="">民族</label><input  v-model="formUser.nation" placeholder="请输入民族 如：‘汉族’" />
			</div>
			<div class="zmiti-form-item">
				<label for="">职务</label><input  v-model="formUser.job" placeholder="请输入职务"/>
			</div>
			<div class="zmiti-form-item select" :data-content="formUser.provicename !== '' ? '' :'请选择省份'">
				<label for="">省份</label>
				<select  v-model="formUser.provicename">
					<option :value="p" v-for='(p,i) in provinceList' :key="i">{{p}}</option>
				</select>
				<span>{{formUser.provicename}}</span>

			</div>
			<div class="zmiti-form-item">
				<label for="">手机号</label><input  v-model="formUser.mobile" placeholder="请输入手机号码"/>
			</div>

			<div v-if='showBtn' v-tap='[submit]' class="zmiti-btn" :class="{'active':isPress}" @touchstart='isPress = true' @touchend='isPress = false'>
				提交
			</div>

			<Toast :msg='msg' :errorMsg='errorMsg'></Toast>

			<div v-if='showMsg' class="lt-full zmiti-msg-mask">
				<div>
					<div class="zmiti-number">
						<div>
							{{showMsg}}
						</div>
					</div>
					<div class="zmiti-btn" v-tap='[closeInfo]'>关 闭</div>
				</div>
			</div>
		</div>
	
	
	</transition>
</template>

<script>
	import './index.css';
	import {
		imgs,
	} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	import Toast from '../toast/toast'
	export default {
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
		name: 'zmitiindex',
		data() {
			return {
				imgs,
				showTeam: false,
				show: true,
				msg:"",
				showMsg:'',
				errorMsg:'',
				viewW: window.innerWidth,
				viewH: window.innerHeight,
				showMasks: false,
				isPress:false,
				formUser:{
					username:'',
					sex:'',
					nation:'',
					job:'',
					provicename:'',
					mobile:''
				},
				provinceList:[
					"北京",
					"安徽",
					"福建",
					"甘肃",
					"广东",
					"广西",
					"贵州",
					"海南",
					"河北",
					"河南",
					"黑龙江",
					"湖北",
					"湖南",
					"吉林",
					"江苏",
					"江西",
					"辽宁",
					"内蒙古",
					"宁夏",
					"青海",
					"山东",
					"山西",
					"陕西",
					"上海",
					"四川",
					"天津",
					"西藏",
					"新疆",
					"兵团",
					"云南",
					"浙江",
					"重庆"
				],
				showBtn:true
			}

			
		},
	
		components: {
			Toast
		},
		methods: {
			 submit(){

				 var s = this;

				 if(!s.formUser.username){
					 this.errorMsg = '用户名不能用空';
					 setTimeout(() => {
						this.errorMsg = '';	 
					 }, 1000);
					 return;
				 }
				 var data = this.formUser;
				 if(!data.provicename){
					 data.provicename = '北京';
				 }
				 data.wxopenid = window.openid || zmitiUtil.randomString();
				 data.pnumber =  window.pNumber;
				 $.ajax({
					 url:window.baseUrl+'/wenming/post_signup/',
					 type:'post',
					 data:data,
					 success(data){
						 if(data.getret === 0){
							 //s.msg = '提交成功';
							 s.errorMsg = '';

							 s.showMsg = '你已经成功提交信息，请等待后台审核。'

							 $.ajax({
								 url:window.baseUrl+'/share/wmsendsms/',
								 type:'post',
								 data:{
									 mobile:s.formUser.mobile,
									 smstype:1,//1.报名成功短信,2.审核通过短信,3.审核未通过短信
									 username:s.formUser.username,
									 projectname:document.title,
									 getdate:'2018年8月14日至2018年8月14日16日'
								 },
								 error(){
								 },
								 success(data){
								 }
							 })

							 
						 }else{
							 s.errorMsg = data.getmsg;
							 s.msg = '';
							 setTimeout(() => {
								s.errorMsg = '';	 
							 }, 2000);
						 }

					 }
				 })
				  
			 },
			 closeInfo(){
				 this.showMsg = '';
			 }
			
		},
	
		mounted() {
			window.s = this;
 
			var {obserable} = this;
			obserable.on('showForm',()=>{
				this.show = true;
			})

			obserable.on('hideForm',()=>{
				this.show = false;
			})
			 
			 
			var  s= this;
			var t = setInterval(()=>{
				
				if(window.openid){
					clearInterval(t);
					$.ajax({
						url:window.baseUrl+'/wenming/getsignuplist/',
						type:'post',
						data:{
							wxopenid:window.openid
						},
						error(){
						},
						success(data){
							if(data.getret === 0 ){
								if(data.list.length<=0){
									return;
								}
								s.userinfo = data.list[0];

								if(s.userinfo.issign){//已签到
									obserable.trigger({
										type:'toggleIndex',
										data:{
											show:true
										}
									})
									s.show = false;
								}
								if(s.userinfo.status*1 === 0){
									s.showMsg = '你已经成功提交信息，请等待后台审核！'
									
								}else if(s.userinfo.status*1 === 1){
									s.showMsg = '你已通过后台审核，请到现在签到！'
								}

								s.formUser = {};

							}
						}
					})
				}
			},30);


			window.onresize = ()=>{

				setTimeout(() => {
					this.showBtn = window.innerHeight >=this.viewH;
				}, 10);
			}
		}
	
	}
</script>