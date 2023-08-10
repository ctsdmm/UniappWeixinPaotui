import store from "../../store.js"
import TradeManage from '../DataBase/TradeManage.js'
import SendMessage from '../SendMessage/UpdateMessage.js'
function ToPay(){
		console.log('pay')
	
		if(!store.state.IsFinsish)
		{
		  store.state.IsFinsish=true
	
		  wx.cloud.callFunction({
		  	name:"weixinPay",
		  	data:{
		  		Trade:store.state.TradeNum,
		  	},
		  	
			
		  	success:(res)=>{

				store.commit('setPayment',res.result.payment)
			    
		
		  		// 发起支付
		  		wx.requestPayment({
		  			...store.state.Payment,
		  			success(res){
		  				// 成功回调
		  				console.log("成功支付",res)
						TradeManage.insertDbTrade()
	                    store.commit('initPayMission')
						//跳到主界面
						uni.showToast({
							 title: '支付成功',
							 icon: 'none',
							duration: 1500
						})
						
						
						// 在这里省钱消息发送
					
						setTimeout(function(){uni.navigateTo({
							url:'../../pages/index/index'
						})} ,1500);
						
		  			},
		  			fail(res){
		  				//回调失败
		  				console.log("支付失败",res,store.state.Payment)
						
		  			}
		  		});
		  	}
		  });
		}
		else
		{
			wx.requestPayment({
				...store.state.Payment,
				success(res){
					// 成功回调
					console.log("成功支付",res)
					// 运行了这一句上一个订单才真正完成
					store.commit('initPayMission')
					TradeManage.insertDbTrade()
					uni.showToast({
						 title: '支付成功',
						 icon: 'none',
						duration: 1500
					})
				
					setTimeout(function(){uni.navigateTo({
						url:'../../pages/index/index'
					})} ,1500);
				},
				fail(res){
					//回调失败
					console.log("支付失败",res,store.state.Payment)
					// 这里显示有一个订单未支付

				}
			});
		}
}
module.exports={
	ToPay
}