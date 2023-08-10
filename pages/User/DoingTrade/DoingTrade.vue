<template>
	<view>
		<view style=" display:flex;  flex-direction: row;  margin: 2% 5%;  border-radius: 30rpx; background-color: white;" v-for="(item,index) in DoingTradeArray" :key="index">
			<view  style="width: 80%; margin: 10rpx,5rpx;" >
				<view  style="background-color: white; margin: 15rpx;">
					<view  style=" margin-bottom: -40rpx; display: flex;">
						<uni-section  :title="item.Type"  titleFontSize="20"  type="line" padding />
						<uni-section  title="金额(/元)"  style="margin-left: 20%;" :sub-title="item.coin" subTitleFontSize="17"  type="line" padding/>
					</view>
		
						<view style="  display: flex; justify-content: center; flex-direction: row; align-items: center;">
							<view style="width: 50%;">
								<uni-section   style="width: 50%;" title="取件地址"  :sub-title="item.GetAddress" type="circle" padding/>
							</view>
							<view style="width: 50%;">
								<uni-section   style="width: 50%; " title="收货物地址"  :sub-title="item.EndAddress" type="circle" padding/>
							</view>
						</view>
				</view>
			</view>
			<view   style="display:flex; width: 20%;">
			<button v-if="isadministrator"  @click="FinishThisTrade(index)" style=" writing-mode: vertical-lr; letter-spacing: 15rpx;  background-color:green; margin: 5% 6%; " >此单完成</button>
			<text  v-else-if="item.doing" style="writing-mode: vertical-lr;  color: green; letter-spacing: 10rpx; margin-top: 10rpx;" >订单正在处理中</text>
			<view  v-else style="display:flex;">
				<text  style="writing-mode: vertical-lr;  color:coral; letter-spacing: 25rpx; margin-top: 10rpx;" >等待接单中</text>
				<button  @click="DeleteThisTrade(index)" style=" writing-mode: vertical-lr; letter-spacing: 15rpx;  background-color:red; margin-left: 0%; margin-right: 15%;">取消此订单</button>
			</view>
			
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {deleteOneOrder,GetDoingTrade,SetTrade_Done_State,} from '../../../Componts/DataBase/TradeManage.js'
	import {SendMessage} from "../../../Componts/SendMessage/SendMessageToUser.js"
	export default {
		data() {
			return {
				T:true
			}
		},
		computed:{
			...mapState(['DoingTradeArray','isadministrator'])
		},
		onLoad(){
			GetDoingTrade()
		},
		methods: {
			...mapMutations(['deleteDoingTradeArray']),
			FinishThisTrade(e)
			{
				// 首先弹出确认框
				uni.showModal({
				    title: '提示',
				    content: '确认此单已经完成了么?',

				}).then(res=>{
					if(res.confirm)
					{
						console.log('确认完成订单')
						//确认完成
						// 先在数据库里把这个订单改为 done -> true
						let t = this.DoingTradeArray[e]
						SetTrade_Done_State(t._id,true)
						//从这个数组里删除这个记录
						this.deleteDoingTradeArray(e)
						// 发送订单消息
						var message = new Object({ openid:t._openid,"character_string1":{"value":t._id},"phrase2":{"value":"订单已经完成"},"name5":{"value":"吴志其"},"thing7":{"value":t.Type},"thing6":{"value":"您的订单已经送达"}})
						SendMessage(message)
						
					}
					else{
						//取消
					}
				})	
			},
			DeleteThisTrade(e){
				
				uni.showModal({
				    title: '提示',
				    content: "确认不再等待，直接取消这个订单么?",
				}).then(res=>{
					if(res.confirm){
						//向数据库发消息取消这个订单
						
						deleteOneOrder(this.DoingTradeArray[e]._id).then(res=>{
								if(res.stats.remover!=0)
								{
									console.log(res)
									this.deleteDoingTradeArray(e)
									 uni.showToast({
												 title: '订单已经取消',
												 icon: 'none',
												duration: 2000
											 })
								}
								else{
									uni.showToast({
												 title: '订单已接单,请刷新',
												 icon: 'none',
												duration: 2000
											 })
								}
								
						}).catch(e=>{
							uni.showToast({
										 title: '删除订单时发生未知错误',
										 icon: 'none',
										duration: 2000
									 })
						})
					}
				})
				
			}
		}
	}
</script>

<style>

</style>
