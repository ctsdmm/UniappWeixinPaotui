import store from "../../store.js"
import GetTrade from "../GetTrade/GetTrade.js"
const m_UserInfoDb = store.state.MainDB.collection('UserInfo') 
const m_OrderDb= store.state.MainDB.collection('Order') 
const m_OrderSize = store.state.MainDB.collection('count').doc('CountSize')

console.log('m_Db.js init')
function collectionDb(str)
{
	return store.state.MainDB.collection(str)
}

function CreateUserInfo(openid)
{
   console.log("CreateUserInfo")
   
  return   m_UserInfoDb.where( {_openid: openid}) 

}

function CreateDb(str)
{
	
	let Date = GetTrade.GetTrades()
	console.log('CreateDbOk',Date)
	wx.cloud.callFunction({
		name:"CreateDb",
		_openid: '{openid}',
		data:{
			DataName:Date,
		},
		success:(res)=>{
			console.log('CreateDbOk',res.errMsg)
		}
		})
}

function UpdateTradeSize(r)
{
	var tf = Number(r)+Number(1);
	
	console.log('UpdateType',r, tf)
	m_OrderSize.update({
		_openid: '{openid}',
  data: {
    Si: tf
  },
  success: function(res) {
    console.log(res)
  }
})
}




function GetTradeSize()
{
	
	console.log('GetTradeSize')
    m_OrderSize.get({
       
	   success: function(res) {
		  
	// 已经有了订单
	store.state.HaveTraded = true
     console.log(res.data.Si)
  
	 // 这个时候 TradeNumber变成了字符串
	 UpdateTradeSize(res.data.Si)
	 var time  = GetTrade.GetTrades()
	 store.state.date=time
	 console.log(time)
	 
	 store.state.TradeNum =  time + res.data.Si
	 console.log('StoreTradeNUm',store.state.TradeNum)
	 // 跟新数据
	  console.log('跟新数据')
	  
	  //结束等待
	   console.log('结束等待')
	 uni.hideLoading()
	  // 支付界面
	  console.log('支付界面')

	  uni.navigateTo({
	  	url:'../../pages/Pay/Pay'
	  })
  },
  fail(res){
	  
	  console.log('GetTradeSizeFail',res)
  }
})
}


module.exports={
	collectionDb,
	CreateDb,
	GetTradeSize,
	UpdateTradeSize,
	CreateUserInfo,
	m_OrderDb,
	m_UserInfoDb
}