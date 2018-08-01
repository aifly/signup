<template>
	<transition name="team">
		<div class="lt-full zmiti-search-main-ui" :class="{'show':show}">
			<div class="zmiti-search-result-C">
				<header class="zmiti-search-header">
					<div>
						<ul>
							<li>省份</li>
							<li>姓名</li>
						</ul>
					</div>
					<div>
						<span>搜索</span>
					</div>
					<div>
						<div>搜索</div>
					</div>
				</header>
			</div>
			<div class="zmiti-search-footer">返回</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				showTeam:false,
			}
		},
		components:{
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},
			hideTeam(){
				this.showTeam = false;
			}

			
		},
		mounted(){

			this.obserable.on('showTeam',()=>{
			 
				this.showTeam = true;
				
			})
		


		}
	}
</script>