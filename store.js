import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


wx.cloud.init({env:"daiqu-8gvpqq0rcc68c911"})
export default new Vuex.Store({
	state:{
		// 用户默认信息
		userDefaultInfo:{
			avart:"cloud://daiqu-8gvpqq0rcc68c911.6461-daiqu-8gvpqq0rcc68c911-1319916770/image/preview.jpg",
			userName:"微信用户",
		},
		isadministrator:false,
		m_openId:null,
		
		Login_view:false,
		Avart_G:"",
		NickName_G:"",
	    MainDB:wx.cloud.database({env:'daiqu-8gvpqq0rcc68c911'}),
		//未完成的订单
		date:null,
		IsFinsish:false,
		HaveTraded:false,
		TradeNum:0,
		Payment:null,
		MissinoType:null,
		GetMissionAddress:null,
		EndMissionAddress:null,
		MissionCoin:2,
		MissionLeve:null,
		
		// 数据库上的订单
		TradeArray:[],
		HistoryTradeArray:[],
		DoingTradeArray:[],
	},
	mutations:{
		
		deleteDoingTradeArray(state,index){
			state.DoingTradeArray.splice(index,1)
		},
		deleteIndexTradeArray(state,index)
		{
		  	state.TradeArray.splice(index,1)
		},
		Logdate(state)
		{
			console.log(state.TradeNum,'/r',state.MissinoType,'/r',state.GetMissionAddress)
		},
		setPayment(state,r){
		state.Payment = r	
		},
		setPayMission(state,T)
		{
			
			state.MissinoType=T.type,
			console.log('missionType',T.type)
			state.GetMissionAddress=T.GA,
			console.log('setGetMission',T.GA)
			state.EndMissionAddress=T.EA,
			console.log('EndMissionAddress',T.EA)
			state.MissionCoin=T.Coin,
				// 0 普通任务 1 紧急任务
			state.MissionLeve=Number(T.Leve)
		},
		
		initPayMission(state)
		{
		state.date=null,
		state.IsFinsish=false
		state.HaveTraded = false,
		state.Payment=null,
		state.MissinoType=null,
		state.GetMissionAddress=null,
		state.EndMissionAddress=null,
		state.MissionCoin=2,
		state.MissionLeve=null
		},
	
		Login_viewToTrue(state){
			state.Login_view = true
		},
		Login_viewToFalse(state){
			state.Login_view = false
		},
		SetAvart(state,avart){
			if(avart!="")
			{
				state.Login_view=true
			}
			else
			{
			    state.Login_view=false
			}
			state.Avart_G = avart
		},
		
		SetNickName(state,name){
			state.NickName_G = name
		}
	},
	actions:{
		
	}
})