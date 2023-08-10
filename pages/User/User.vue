<template>
	<view  v-if="Login_view">
		<view class="InfoView">
			<image  class="logo" :src="Avart_G"></image>
			<view  class="text-area">
				<text class="title">{{NickName_G}}</text>
			</view>
		</view>
		<view>
			<uni-row>
				<uni-col :span="8">
					<view>
						<button  @click="NoPaytradeButton" type="default">未支付订单</button>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view>
						<button  @click="DoingTradeButton" type="default">正在执行订单</button>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view>
						<button  @click="HistoryTradesButton" type="default">历史订单</button>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="LoginView" >
			<button  @click="OutLogin" type="warn">退出登录</button>
		</view>
	</view>
	<view v-else>
		<button @click="Login">登录</button>
	</view>
</template>

<script>


import Login, { wxGetProfi } from '../../Componts/Login/Login.js'
import {mapState} from "vuex"

				
	export default {
		data() {
			
			return {

				 trade :1
			}
		},
		computed:{
		...mapState(['Login_view','Avart_G','NickName_G','HaveTraded'])
		},
		created() {
			
		},
		

			
		onShow(){
			console.log('onShow')
		
		},

		methods: {
			Login(){
				console.log('Loging。。。')
			  //	Login.wxGetProfi()	
			    Login.wxLogin()
			 
			},
			OutLogin()
			{
				uni.clearStorageSync('avatart')
				uni.clearStorageSync('nickName')
				uni.clearStorageSync('openID')
				console.log('Out')
				this.$store.commit('SetAvart',"")
				this.$store.commit('SetNickName',"")
				this.$store.commit('Login_viewToFalse')
			},
			NoPaytradeButton(){
				if(this.HaveTraded){
				uni.navigateTo({
					url:'NoPayOrder/NoPayOrder'
				})
				}else{
					uni.showToast({
						 title: '没有未支付的订单',
						 icon: 'none',
						duration: 2000
					})
				}
			},
			DoingTradeButton(){
				uni.navigateTo({
					url:'./DoingTrade/DoingTrade'
				})
			},
			HistoryTradesButton()
			{
				uni.navigateTo({
					url:'./FinshiedTrade/FinshiedTrade'
				})
			}

		}
	}
</script>

<style>
.InfoView
{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
}
.logo {
	height: 150rpx;
	width: 150rpx;
	margin-top: 15rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}
.LoginView{
		width:100%;
		position:fixed;
		bottom:60rpx;
}
	.text-area {
		display: flex;
		justify-content: center;
	}
</style>
