<template>
	<view>
		<uni-section title="任务类型" type="line" > 
		 <uni-data-select style="background-color: white;"
		        v-model="SelectMissionType"
		        :localdata="missionType"
		      ></uni-data-select>
		</uni-section>
		<uni-section title="取件地址"  sub-title="选择默认取货地址" type="line" padding>
			<uni-data-select style="background-color: white;"
			       v-model="GetAddresIndex"
			       :localdata="defaultGetAddresArray"
				   @change="GetAddressSelectChange"
			     ></uni-data-select>
					<uni-easyinput type="textarea" v-model="GetMissionAddres" ></uni-easyinput>
					<checkbox-group  @change="CheckOneChange">
						<checkbox  :checked="CheckOne">新增默认取件地址</checkbox>
					</checkbox-group>
					
		</uni-section>
		<uni-section title="收货地址"  sub-title="选择默认收货物地址" cube-to type="line" padding>
			<uni-data-select style="background-color: white;"
			       v-model="EndAddresIndex"
			       :localdata="defaultEndAddresArray"
				    @change="EndAddressSelectChange"
			     ></uni-data-select>
					<uni-easyinput type="textarea" v-model="EndMissionAddres" ></uni-easyinput>
					<checkbox-group  @change="CheckTwoChange">
					<checkbox :checked="CheckTwo" >新增默认收货地址</checkbox>
					</checkbox-group>
		</uni-section>
		
		<uni-section title="赏金(/元)"  type="line" sub-title="默认最低赏金2元" padding>
					<uni-easyinput type="number" v-model="coin" @change="SetCoin" ></uni-easyinput>
		</uni-section>
		<button @click="SendMission" style="margin: 10rpx 20rpx;" type="primary">发布悬赏</button>
	</view>
</template>

<script>
	import DataBase from '../../Componts/DataBase/m_Db.js'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				coin:2,
				CheckOne:false,
				CheckTwo:false,
				SelectMissionType:null,
				EndMissionAddres:null,
				GetMissionAddres:null,
				GetAddresIndex:null,
				EndAddresIndex:null,
				Leve:1,
				missionType: [
				          { value: 0, text: "取快递" },
				          { value: 1, text: "取餐" }
				        ],
				defaultGetAddresArray_size:0,
				defaultGetAddresArray:[
		
				],
				defaultEndAddresArray_size:0,
				defaultEndAddresArray:[
					
				]
			}
		},
		computed:{
		  ...mapState(['HaveTraded'])
		},
		onLoad(){
			if(uni.getStorageSync('defaultGetAddresArray'))
			{
				this.defaultGetAddresArray = uni.getStorageSync('defaultGetAddresArray')
				this.defaultGetAddresArray_size = this.defaultGetAddresArray.length
			}
		
			if(uni.getStorageSync('defaultGetAddresArray'))
			{
				this.defaultEndAddresArray = uni.getStorageSync('defaultEndAddresArray')
				this.defaultEndAddresArray_size = this.defaultEndAddresArray.length
			}
		},
		methods: {
			...mapMutations(['setPayMission']),
			 GetAddressSelectChange(e)
			 {
			    this.GetMissionAddres =  this.defaultGetAddresArray[e].text
			 },
			 EndAddressSelectChange(e)
			 {
			    this.EndMissionAddres =  this.defaultEndAddresArray[e].text
			 },
			
			SetCoin(e){
			
			   if(e<2)
			   {
				  uni.showToast({
				  	 title: '最低金额为2元',
				  	 icon: 'none',
				  	duration: 2000
				  }) 
				  this.coin = 2
			   }else
			   {
				   this.coin = e
			   }
			},
			CheckOneChange()
			{
				
				this.CheckOne =!this.CheckOne
			},
			CheckTwoChange()
			{
				this.CheckTwo =!this.CheckTwo
			},
			
			SendMission(){
				
				if (this.HaveTraded == true) {
				uni.showModal({
						   title:'提示',
						  content: '你有一个订单未支付，请先支付,或删除',
									  success(res){
										  if(res.confirm){
											
											uni.navigateTo({
												url:'../User/NoPayOrder/NoPayOrder'
											})
										  }
										  else if(res.cancel){
											  
										  }
									  }
				})
				return false
					} 
				//首先检查是否全部输入了 没有输入为空
				console.log(this.SelectMissionType)
				if(this.SelectMissionType==null)
				{
				 uni.showToast({
				 	 title: '请选择任务类型',
				 	 icon: 'none',
				 	duration: 2000
				 })
				 return false
				}
				if(this.EndMissionAddres==null)
				{
					uni.showToast({
						 title: '请输入取件地址',
						 icon: 'none',
						duration: 2000
					})
					return false
				}
				if(this.GetMissionAddres==null)
				{
					uni.showToast({
						 title: '请输入收获地址',
						 icon: 'none',
						duration: 2000
					})
					return false
				}
				
				// 是否存储默认地址
				
				if(this.CheckOne)
				{
					 this.defaultGetAddresArray.push(new Object({value:this.defaultGetAddresArray_size++ ,text:this.GetMissionAddres }))  
					uni.setStorageSync('defaultGetAddresArray',this.defaultGetAddresArray)
				}
				if(this.CheckTwo)
				{
					this.defaultEndAddresArray.push(new Object({value:this.defaultEndAddresArray_size++ ,text:this.EndMissionAddres }))
					uni.setStorageSync('defaultEndAddresArray',this.defaultEndAddresArray)
			   }
			   uni.showModal({
			   		   title:'提示',
			   		  content: '确认信息输入正确么？',
					  success:function(res){
						  if(res.confirm){
							  // 存储其它数据
							  var that = this
							  console.log(that.missionType[that.SelectMissionType].text)
							 console.log(that.GetMissionAddres)
						
							  
							  that.setPayMission({type:that.missionType[that.SelectMissionType].text,GA:that.GetMissionAddres,EA:that.EndMissionAddres
							  ,Coin:that.coin,Leve:that.Leve})
							  
							  DataBase.GetTradeSize()
							  uni.showLoading({
							  	  title: '正在创建订单。。',
							  	  mask:true
							  	})
							  //在这里获取订单
							  console.log('结束获取订单等待')
						  }
						  else if(res.cancel){
							  
						  }
					  }.bind(this)
			   })
			 
			}
		},
	}
	
</script>

<style>
.des {
  padding-left: 40rpx;
  padding-top: 20rpx;
  font-size: 26rpx;
  color: #acacac;
  letter-spacing: 2rpx;
  line-height: 42rpx;
}
</style>
