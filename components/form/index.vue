<template>
	<transition name='main'>
		<div class="zmiti-form-main-ui lt-full" :class="{'show':show}">
			<div>
				<img :src="imgs.baomingTitle" alt="">
			</div>
			<div class="zmiti-form-item">
				<label for="">姓名</label><input placeholder="请填写报名人姓名" type="text" v-model="formUser.username">
			</div>
			<div class="zmiti-form-item select"  :data-content="formUser.sex !== '' ? '' :'请选择报名人性别'">
				<label for="">性别</label><select v-model="formUser.sex">
					<option :value="1">男</option>
					<option :value="0">女</option>
				</select>
				<span>{{formUser.sex === 1 ? '男':formUser.sex === 0 ? '女': ''}}</span>
			</div>
			<div class="zmiti-form-item">
				<label for="">民族</label><input  v-model="formUser.nation" placeholder="请输入报名人民族" />
			</div>
			<div class="zmiti-form-item">
				<label for="">职务</label><input  v-model="formUser.job" placeholder="请输入报名人职务"/>
			</div>
			<div class="zmiti-form-item select" :data-content="formUser.provicename !== '' ? '' :'请选择报名人省份'">
				<label for="">省份</label>
				<select  v-model="formUser.provicename">
					<option :value="p" v-for='(p,i) in provinceList' :key="i">{{p}}</option>
				</select>
				<span>{{formUser.provicename}}</span>

			</div>
			<div class="zmiti-form-item">
				<label for="">手机号</label><input  v-model="formUser.mobile" placeholder="请输入报名人手机号码"/>
			</div>

			<div v-tap='[submit]' class="zmiti-btn" :class="{'active':isPress}" @touchstart='isPress = true' @touchend='isPress = false'>
				提交
			</div>

			<Toast :msg='msg' :errorMsg='errorMsg'></Toast>
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
					"云南",
					"浙江",
					"重庆"
				]
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
				 data.wxopenid = '1';
				 data.pnumber =  1;
				 $.ajax({
					 url:window.baseUrl+'/wenming/post_signup/',
					 type:'post',
					 data:data,
					 success(data){
						 if(data.getret === 0){
							 s.msg = '提交成功';
							 s.errorMsg = '';

							 setTimeout(() => {
								s.msg = '';
								s.show = false;
							 }, 2000);
						 }else{
							 s.errorMsg = '提交失败';
							 s.msg = '';
							 setTimeout(() => {
								s.errorMsg = '';	 
							 }, 2000);
						 }

					 }
				 })
				  
			 }
			
		},
	
		mounted() {
			window.s = this;

			$.ajax({
				url:window.baseUrl+'/wenming/getsignuplist/',
				type:'post',
				data:{
					type:2,
					name:'贵'
				},
				success(data){
					console.log(data);
				}

			})
			/*$.ajax({
				url:window.baseUrl+'/wenming/signin/',
				type:'post',
				data:{
					wxopenid:'1',
					pnumber:1
				},
				success(data){
					console.log(data);
				}

			})*/
		}
	
	}
</script>