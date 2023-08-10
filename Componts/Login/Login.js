import store from "../../store.js"
import DataBase from '../DataBase/m_Db.js'
import { GetTrades } from "../GetTrade/GetTrade.js";
function wxLogin(){
		//7f5f5f87a378d48a6425a490531eeb2c
		console.log('wxLogin..')
		wx.getUserProfile({
		        //声明获取用户个人信息后的用途(必填)
				desc: "仅用作登录功能",
				success: (re) => {
					wx.cloud.callFunction({
						name:"login"
					}).then(r=>{
						 uni.setStorageSync('openID',r.openid)
						 
						 DataBase.CreateUserInfo(r.openid).get().then(res=>{
						 if(res.data.length!=0)
						 {
						 	 console.log('找到到了',res)
						 	 // 将数据库里的数据拉入本地
						 	 
						 	 uni.setStorageSync('avatart',res.data[0].imgSrc)
						 	 uni.setStorageSync('nickName',res.data[0].userName)
						 	 uni.setStorageSync('isAdmin',res.data[0].Admin)
						 	 store.commit('SetAvart',res.data[0].imgSrc)
						 	 store.commit('SetNickName',res.data[0].userName)
						 	 
						 	 store.state.isadministrator = res.data[0].Admin
						 	 store.commit('Login_viewToTrue')
						 	 
						 }
						 else{
						 		console.log('没找到')
						 		// 创建一个自己的表单
						 		var time = GetTrades().substr(0,8)
						 		DataBase.m_UserInfoDb.add({
						 		data:{
						 			userName:store.state.userDefaultInfo.userName,
						 			Data:time,
						 			imgSrc:store.state.userDefaultInfo.avart,	
						 			Admin:false
						 		}
						 		
						 		}).then(res=>{
						 		console.log('新建用户成功')
						 		})
						 		uni.setStorageSync('isAdmin',false)
						 		uni.setStorageSync('avatart',store.state.userDefaultInfo.avart)
						 		uni.setStorageSync('nickName',store.state.userDefaultInfo.userName)
						 		store.commit('SetAvart',store.state.userDefaultInfo.avart)
						 		store.commit('SetNickName',store.state.userDefaultInfo.userName)
						 		store.commit('Login_viewToTrue')
						 	}
						 })
						 
					})
				
				},
				fail: () => {
					uni.$showMsg('您取消了登录授权')
				}
			})
		
		

}

module.exports={
	wxLogin,
}