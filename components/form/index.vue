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
			<div class="zmiti-form-item select" :data-content="formUser.province !== '' ? '' :'请选择报名人省份'">
				<label for="">省份</label>
				<select  v-model="formUser.province">
					<option :value="p" v-for='(p,i) in provinceList' :key="i">{{p}}</option>
				</select>
				<span>{{formUser.province}}</span>

			</div>
			<div class="zmiti-form-item">
				<label for="">手机号</label><input  v-model="formUser.mobile" placeholder="请输入报名人手机号码"/>
			</div>

			<div class="zmiti-btn" :class="{'active':isPress}" @touchstart='isPress = true' @touchend='isPress = false'>
				提交
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
	import IScroll from 'iscroll';
	export default {
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
		name: 'zmitiindex',
		data() {
			return {
				imgs,
				showTeam: false,
				show: false,
				viewW: window.innerWidth,
				viewH: window.innerHeight,
				showMasks: false,
				isPress:false,
				formUser:{
					username:'',
					sex:'',
					nation:'',
					job:'',
					province:'',
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
		},
		methods: {
			 
			
		},
	
		mounted() {
			window.s = this;

			
			 
		}
	
	}
</script>