import {m_OrderDb} from "./m_Db.js"
import store from '../../store.js'
// 从订单数据库里获取所有刚刚提交的订单
function GetAllNoDedtrade()
{
	if(store.state.isadministrator)
	{
		m_OrderDb.where({
		 done:false,
		 doing:false
		}).get({
			success:function(res){
				store.state.TradeArray  =  Object.values(res.data)
				uni.stopPullDownRefresh()
			},
			fail:function(res){
				console.log('没有查到订单',res.data)
				
			}
		})
	}
	else{
		m_OrderDb.where({
		_openid: '{openid}',
		 done:false,
		 doing:false
		}).get({
			success:function(res){
				store.state.TradeArray  =  Object.values(res.data)
				uni.stopPullDownRefresh()
			},
			fail:function(res){
				console.log('没有查到订单',res.data)
				
			}
		})
	}
	
}
// 删除某个订单
function deleteOneOrder(orderID){
	console.log('Delete This Trade',orderID)
	return m_OrderDb.where({
		_id:orderID,
		doing:false
	}).remove()
}

//用户提交一个订单
function insertDbTrade()
{
	
	//DataBase.CreateDb()
	console.log( 'I m Db')
	m_OrderDb.add({
		data:{
			_id:store.state.TradeNum, // 订单号
			Type:store.state.MissinoType,
			GetAddress:store.state.GetMissionAddress,
			EndAddress:store.state.EndMissionAddress,
			coin:store.state.MissionCoin,
			Leve:store.state.MissionLeve,
			Year:store.state.TradeNum.substr(0,4),
			Date:store.state.TradeNum.substr(4,4),
		    DateInfo:store.state.TradeNum[8],
			done:false,
			doing:false
		},
		success:function(res)
		{
				console.log('insertDb',res)
		}
	})
}

// 管理员点击更改后把相应订单
function SetTrade_Doing_State(tradeNum,flag){
	
	console.log('正在接单',tradeNum)
	return m_OrderDb.doc(tradeNum).update({
		data:{
			doing:true
		}
	})

}

function SetTrade_Done_State(tradeNum,flag){
	
	return m_OrderDb.doc(tradeNum).update({
		_openid: '{openid}',
  data: {
    done: flag
  },
})
}


// 获取真正执行的订单
function GetDoingTrade()
{ 
	if(store.state.isadministrator)
	{
		m_OrderDb.where({
			doing:true
		}).get().then(res=>{
			store.state.DoingTradeArray = Object.values(res.data)
			console.log('doing',res)
		})
	}
	else{
		m_OrderDb.where({
			_openid: '{openid}',
			done:false
		}).get().then(res=>{
			store.state.DoingTradeArray = Object.values(res.data)
			console.log('doing',res)
		})
	}
	

}



// 获取完成的订单信息
function GetFinishTrder(year,date)
{
if(store.state.isadministrator)
	{
		return m_OrderDb.where({
			done:true,
			Year:year,
			Date:date
		}).get()
	}else{
		return m_OrderDb.where({
			_openid: '{openid}',
			done:true,
			Year:year,
			Date:date
		}).get()
	}
	
}



module.exports={
	GetAllNoDedtrade,
	SetTrade_Doing_State,
	GetFinishTrder,
	GetDoingTrade,
	insertDbTrade,
	SetTrade_Done_State,
	deleteOneOrder
}