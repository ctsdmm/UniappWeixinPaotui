<template>
	<view v-if="isadministrator">
		<view>
			<button @click="AllClickButton" size="mini">全部</button>
			<button size="mini">。。。。</button>

		</view>
		<view style=" margin: 0% 5%;  border-radius: 30rpx; background-color: white;" v-for="(item,index) in TradeArray" :key="index">
			<view style="margin: 10rpx,5rpx;" >
				<view  style="background-color: white; margin: 15rpx;">
					<view  style=" margin-bottom: -40rpx; display: flex;">
						<uni-section  :title="item.Type"  titleFontSize="20"  type="line" padding />
						<uni-section  title="金额(/元)"  style="margin-left: 20%;" :sub-title="item.coin" subTitleFontSize="17"  type="line" padding/>
					</view>
		
						<view style="  display: flex; justify-content: center; flex-direction: row; align-items: center;">
							<view style="width: 50%;">
								<uni-section   style="width: 50%;" title="取件地址"  :sub-title="item.GetAddress" type="circle" padding/>
								<button   @click="NoDoThis(index)" style="margin-left:10%;" size="mini">不接</button>
							</view>
							<view style="width: 50%;">
								<uni-section   style="width: 50%; " title="收货物地址"  :sub-title="item.EndAddress" type="circle" padding/>
								<button @click="DoThis(index)" style="float: right; margin-right: 10%;" size="mini">接单</button>
							</view>
						</view>
				</view>
			
			</view>
		</view>
		<modal v-if="areaShow" title="填写理由(限填20个字)"  confirm-text="保存" cancel-text="取消" @cancel="cancelAdd" @confirm="confirmAdd">
		<input type="text" v-model="areaTxt"  @input="SetAreaTxt"  class="intxt" maxlength="20" />
		</modal>
	</view>
	<view v-else>
		不是管理员
	</view>

</template>

<script>
	import TradeManage from '../../Componts/DataBase/TradeManage.js' 
	import {mapState,mapMutations} from'vuex'
import { SendMessage, CreateMessageDate } from '../../Componts/SendMessage/SendMessageToUser.js'
	export default {
		data() {
			return {
				selectIndex:null,
				messageDate:null,
				areaTxt:'得加钱!',
				areaShow:false,

			}
		},
		computed:{
		...mapState(['TradeArray','isadministrator']),
		},
		onLoad(){
		
		// 从数据库读取信息回来
		if(this.isadministrator)
		{
			console.log('MainPage Onload GetDb')
			TradeManage.GetAllNoDedtrade()
		}

		},
		// 下拉刷新
		onPullDownRefresh(){
			if(this.isadministrator)
			{
				TradeManage.GetAllNoDedtrade()
			}else
			{
				uni.stopPullDownRefresh()
			}
			
		},
		
		methods: {
		...mapMutations(['deleteIndexTradeArray']),
			
			
		AllClickButton(){
			console.log(this.TradeArray)
		},
			confirmAdd(){
			
				console.log('删除订单')
				let t = this.TradeArray[this.selectIndex]
				
				this.areaShow = true
				
				
					TradeManage.deleteOneOrder(t._id).then(res=>{
						
							// 这时才能确定删除这个订单且发送消息
							this.messageDate = CreateMessageDate(t,'不接此单',this.areaTxt)
							//再订单数据库里取消这个订单
							SendMessage(this.messageDate)
					}).catch(e=>{
						
					 uni.showToast({
								 title: '删除订单失败',
								 icon: 'none',
								duration: 2000
							 })
					})
				
			
				
	
				
				
				
				this.areaShow = false
			},
			cancelAdd()
			{
				this.areaShow = false
			},
			clickSetMission(){
			 console.log('发布任务')
			 uni.navigateTo({
			 	url:"/pages/setMission/setMission"
			 })
			},
			NoDoThis(e)
			{
				this.selectIndex = e
				this.areaShow=true
			},
			DoThis(e)
			{
			
			uni.showModal({
				title:"提示",
				content:"确认接受这个订单么?"
			}).then(res=>{
				if(res.confirm)
				{
					// 首先更改 doing flase-> true
					let t = this.TradeArray[e]
					TradeManage.SetTrade_Doing_State(t._id,true).then(res=>{
					if(res.stats.updated!=0)
					{
						// 接单成功
						console.log(res)
						// 给用户发信息
						this.messageDate = CreateMessageDate(t,'已经接单','请等待后续订单通知')
						// 从数组里删除这个订单
						this.deleteIndexTradeArray(e)
					uni.showToast({
									 title: '接单成功',
									 icon: 'none',
									duration: 2000
								 })
					}
					else{
						uni.showToast({
										 title: '接单失败,用户可能取消了订单',
										 icon: 'none',
										duration: 2000
									 })
									 // 从数组里删除这个订单
									 this.deleteIndexTradeArray(e)
					}
						
					}).catch(e=>{
						uni.showToast({
										 title: '接单发生未知错误',
										 icon: 'none',
										duration: 2000
									 })
					})
					
	
				}
				else{
					//直接取消
				}
			})
				
			}
			
		}
	}
</script>

<style>
.buttonPara{
	display: flex;
	flex-direction: row;
}
</style>
