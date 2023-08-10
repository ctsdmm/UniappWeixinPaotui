<template>
	<view>
		<view class="example-body">
		<uni-datetime-picker  type="date" :clear-icon="false" v-model="dataTime" @change="changeDate" />
		</view>
		<view>
			<view style=" margin: 0% 5%;  border-radius: 30rpx; background-color: white;" v-for="(item,index) in HistoryTradeArray" :key="index">
				<view style="margin: 10rpx,5rpx;" >
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
			</view>
		</view>
	</view>
</template>

<script>
	
	import {mapState} from 'vuex'
	import {GetFinishTrder} from '../../../Componts/DataBase/TradeManage.js'
	export default {
		data() {
			return {
				selectDate:null,
				selectYear:null,
				dataTime:null,
			}
		},
		computed:{
		 ...mapState(['HistoryTradeArray'])	
		},
		onLoad(){
			this.dataTime=Date.now()
			var t = new Date(this.dataTime).toISOString()
			this.selectYear = t.substr(0,4)
			this.selectDate = t.substr(6,2)+t.substr(8,2)
			GetFinishTrder(this.selectYear,this.selectDate).then(res=>{
				if(res.data.length!=0)
				{
					store.state.HistoryTradeArray = Object.values(res.data)
				}
				else{
					uni.showToast({
						title:"没有历史订单",
						icon:"error",
						duration:2000
					})
				}
			}).catch(e=>{
				uni.showToast({
					title:"寻找历史订单出错",
					icon:"error",
					duration:4000
				})
			})
		},
	
		methods: {
			changeDate(e)
			{
				console.log(e)
				this.selectYear = e.substr(0,4)
				this.selectDate = e.substr(6,2)+e.substr(8,2)
				GetFinishTrder(this.selectYear,this.selectDate).then(res=>{
				if(res.data.length!=0)
				{
					store.state.HistoryTradeArray = Object.values(res.data)
				}
				else{
					uni.showToast({
						title:"没有历史订单",
						icon:"error",
						duration:2000
					})
				}
			}).catch(e=>{
				uni.showToast({
					title:"寻找历史订单出错",
					icon:"error",
					duration:4000
				})
			})
			}
		}
	}
</script>

<style>

</style>
