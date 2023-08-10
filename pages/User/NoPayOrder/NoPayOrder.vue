<template>
	<view height="100%" >
		
		<view class="RadioView" >
			<button>{{MissioCoin}}</button>
			<view style="margin: 15rpx;">
			<uni-section :title="MissionLeveArry[MissionLeve]"   type="line" padding/>
			<view    style="  display: flex; justify-content: center; flex-direction: row; align-items: center;">
				<uni-section   style="width: 50%;" title="取件地址"  :sub-title="GetMissionAddress" type="circle" padding/>
				<uni-section   style="width: 50%; " title="收货物地址"  :sub-title="EndMissionAddress" type="circle" padding/>
			</view>
			</view>
		</view>
		<view class="Down" >
			<uni-section title="结算"   type="line" padding>
			<view style="  display: flex;lex-direction: row; align-items: center;">
				<button  @click="DeleteThisTrade" width="100%" type="warn" >删除订单</button>
				<text style="margin-left: 10rpx; font-size: 20px;"  >总金额:</text>
				<text style="margin-left: 15rpx;font-size: 20px;" >{{MissionCoin}}</text>
				<text style="margin-left: 15rpx;font-size: 20px">元</text>
				<button @click="PayTheTrade" type="primary" width="100%" style="margin-right: 5%;">支付订单</button>
			</view>
			</uni-section>
		</view>
	</view>

</template>

<script>
	import Pay from "../../../Componts/Pay/PayTrade.js"
	import {mapMutations,mapState} from "vuex"
	export default {
		data() {
			return {
			  MissionLeveArry:["普通任务","紧急任务"],
			}
		},
		computed:{
			...mapState(['TradeNum','MissinoType','EndMissionAddress','GetMissionAddress','MissionLeve','MissionCoin'])
		},
		onLoad(){
			this.Logdate()
			console.log(this.$store.state.TradeNum,this.TradeNum)
			
		},
		methods: {
			...mapMutations(['initPayMission','Logdate']),
			PayTheTrade(){
				// 跳入支付
				Pay.ToPay()
			
			},
			DeleteThisTrade()
			{
				// 清除Store里的信息
				this.initPayMission()
				uni.showToast({
					 title: '已删除订单',
					 icon: 'none',
					duration: 1500
				})
				
				setTimeout(function(){uni.navigateBack()} ,1500);
				
			}
			
		}
	}
</script>

<style>
.RadioView{
	border-radius:  30rpx;
	background-color: white;
	margin: 15rpx 20rpx;
}
.Down{
	width:100%;
	position:fixed;
	bottom:60rpx;
}
</style>
