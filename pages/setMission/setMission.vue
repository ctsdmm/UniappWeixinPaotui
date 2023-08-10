<template>
	<view>
		<view style=" margin: 20px; " class="mainPickerView"  >
			<text >任务类型:</text>
			<picker @change="bindPickerChange" style="background-color: white; margin: 0px 40px;" :value="misssionIndex" :range="missionArrary">
				<view>{{missionArrary[misssionIndex]}}</view>
			</picker>
		</view>
		<view>
			<text >取件/货 地址:</text>
			<textarea  :value="_FrontAddress" @input="FrontAddressInput" auto-height style="background-color: beige; " class="missionPath" placeholder="输入取货/餐地址" />
		</view>
		<view style="margin: 20px 0 0 0;">
			<text >收件/货 地址:</text>s
			<textarea  :value="_EndAddress" @input="EndAddressInput" auto-height style="background-color: beige; " class="OrderPath" placeholder="输入收货/餐地址" />
		</view>
		<button type="primary" @click="OkBut">确认</button>
		<view  style=" margin: 20px; " class="CoinPickerView"  >
			<text >支付金额:</text>
			<picker @change="bindPickerCoinChange" style="background-color: white; margin: 0px 40px;" :value="Index" :range="coinArrary">
				<view>{{coinArrary[coinIndex]}}</view>
			</picker>
			<text>元</text>
		</view>
		<button v-if="ShowPayButton" class="PayButton" @click="buttonToPay" type="primary">确认支付</button>
	</view>
</template>

<script>
import GetTrade,{GetTrades} from '../../Componts/GetTrade/GetTrade.js'
import DataBase from '../../Componts/DataBase/m_Db.js'
import {mapState} from "vuex"
	export default {
		data() {
			return {
				_FrontAddress:"",
				_EndAddress:"",
				IsFinsish:false,
				m_payment:null,
				missionArrary:['取快递','取餐'],
				misssionIndex:0,
				coinArrary:['2','3','4','5','6','7'],
				coinIndex:0
			}
		},
		computed:{
		...mapState(['ShowPayButton','TradeNum'])
		},
		methods: {
			FrontAddressInput(e){
				this._FrontAddress =  e.detail.value;
			},
			EndAddressInput(e){
				this._EndAddress =  e.detail.value;
			},
			OkBut()
			{
				// 在这里面生成订单，当完成后才显示支付按钮
				console.log('确认下单')
			   DataBase.GetTradeSize()

			},
			bindPickerChange:function(e){
				console.log('picker do it')
				 this.misssionIndex = e.detail.value
			},
			bindPickerCoinChange:function(e){
				console.log('picker do it')
				 this.coinIndex = e.detail.value
			},
			buttonToPay()
			{
				
				console.log('pay')
				if(!this.IsFinsish)
				{
				  this.IsFinsish=true
		    //       console.log('wada',String(this.TradeNum))
				  // let Tra = GetTrades()+ String(this.TradeNum)
				  // console.log('订单编号',Tra)
				  wx.cloud.callFunction({
				  	name:"weixinPay",
				  	data:{
				  		Trade:Tra,
				  	},
				  	
				  	success:(res)=>{
				  		console.log(res)
				  		this.m_payment = res.result.payment;
				          
				  		console.log("startPay")
				  		console.log(this.m_payment)
				  		// 发起支付
				  		wx.requestPayment({
				  			...this.m_payment,
				  			success(res){
				  				// 成功回调
				  				console.log("成功支付",res)
				  			    
								DataBase.insertDbTrade()
								_FrontAddress=""
								_EndAddress=""
								this.IsFinsish=false
				  			},
				  			fail(res){
				  				//回调失败
				  				console.log("支付失败",res)
								// 这里显示有一个订单未支付
								
				  			}
				  		});
				  	}
				  });
				}
				else
				{
					wx.requestPayment({
						...this.m_payment,
						success(res){
							// 成功回调
							console.log("成功支付",res)
							// 运行了这一句上一个订单才真正完成
							DataBase.insertDb(Tra,missionArrary[misssionIndex],_FrontAddress,_EndAddress,coinArrary[coinIndex])
							_FrontAddress=""
							_EndAddress=""
							this.IsFinsish=false
						},
						fail(res){
							//回调失败
							console.log("支付失败",res)
							// 这里显示有一个订单未支付
						}
					});
				}
			},

		}
	}
</script>

<style>
.mainPickerView{
	display: flex;
flex-direction: row;
}
.CoinPickerView{
	flex-direction: row;
	display: flex;
	position: fixed;
	bottom:150rpx;
}
.missionPath
{
	width:100%;
}
.OrderPath
{
	width:100%;
}
.PayButton{
	width:100%;
	position:fixed;
	bottom:60rpx;
}

</style>
