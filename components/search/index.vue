<template>
	<transition name="team">
		<div class="lt-full zmiti-search-main-ui" :class="{'show':show}">
			<div class="zmiti-search-result-C">
				<header class="zmiti-search-header" v-if='showHeader'>
					<div>
						<span v-tap='[toggleSearchType]'>{{searchtype  ?'省份':'姓名'}}</span>
						<ul>
							<li>省份</li>
							<li>姓名</li>
						</ul>
					</div>
					<div>
						
						<input ref='keyword' type="text" placeholder="搜索"  v-model="keyword" />
					</div>
					<div>
						<div v-tap='[search]' :class="{'active':isPress}" @touchstart='isPress = true' @touchend='isPress = false'>搜 索</div>
					</div>
				</header>
				<div class="zmiti-search-list" ref='list'>
					<ul>
						<li v-for='(user,i) in userList' :key="i">
							<header v-tap='[toggleUser,user]'>
								<div>{{user.username}}</div>
								<div :class="{'active':user.isdetail}">{{user.isdetail ? "收起":"查看详情"}}</div>
							</header>
							<section :style="{minHeight:user.isdetail?'560px':0,height:user.isdetail?'560px':0}">
								<div class='zmiti-user-item'>
									<label for="">姓名 ：</label><span>{{user.username}}</span>
								</div>
								<div class='zmiti-user-item'>
									<label for="">性别 ：</label><span>{{user.sex === 1 ? '男' :'女'}}</span>
								</div>
								<div class='zmiti-user-item'>
									<label for="">民族 ：</label><span>{{user.nation}}</span>
								</div>
								<div class='zmiti-user-item'>
									<label for="">职务 ：</label><span>{{user.job}}</span>
								</div>
								<div class='zmiti-user-item'>
									<label for="">省份 ：</label><span>{{user.provicename}}</span>
								</div>
								<div class='zmiti-user-item'>
									<label for="">手机 ：</label><span>{{user.mobile}}</span>
								</div>
								<div class='zmiti-user-item'>
									<label for="">房间 ：</label><span>{{user.roomnumber}}</span>
								</div>
								<div class='zmiti-user-item'>
									<label for="">座位 ：</label><span>{{user.seatnumber}}</span>
								</div>
							</section>
						</li>
						<li style="height:50px;"></li>
					</ul>
				</div>
			</div>
			<div class="zmiti-search-footer" v-tap='[back]'>返回</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	import IScroll from 'iscroll';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				showHeader:true,
				searchtype:false,
				isPress:false,
				show:false,
				showTeam:false,
				keyword:'',
				userList:[
					
				]
			}
		},
		components:{
		},
		
		methods:{
			toggleSearchType(){
				this.searchtype = !this.searchtype;
			},
			toggleUser(user){
				var s = this;
				user.isdetail = !user.isdetail;
				this.userList = this.userList.filter(()=>{return 1});
				setTimeout(() => {
					s.scroll.refresh();
				}, 650);
			},
			imgStart(e){
				e.preventDefault(); 
			},
			hideTeam(){
				this.showTeam = false;
			},
			back(){
				this.show = false;
				this.userList.length = 0;
			},
			search(){
				var s = this;

				this.$refs['keyword'].blur();

				$.ajax({
					url:window.baseUrl+'/wenming/getsignuplist/',
					type:'post',
					data:{
						type:(s.searchtype|0)+1,
						name:s.keyword,
						status:1,
						pnumber:window.pNumber
					},
					success(data){
						if(data.getret === 0 ){
							s.userList = data.list;
						}
						console.log(data);
					}
				})
			
			}

			
		},
		mounted(){

			this.obserable.on('showSearch',(data)=>{
				this.show = true;
				if(data){
					this.userList = window.leaders;
					this.showHeader = false;
				}
				
			})

			this.scroll = new IScroll(this.$refs['list'],{
				scrollbars:true
			})
		


		}
	}
</script>