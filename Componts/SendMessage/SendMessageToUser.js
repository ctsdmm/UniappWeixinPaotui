function SendMessage(Data){
	// 找到这个用户的订单号，加入info
		console.log("MessageData",Data)
		wx.cloud.callFunction({
			name:'SendMessage',
			data:{
				openID:Data.openid,
			 	data:Data	
				}
		}).then(res=>{
			console.log(res)
		})
	
	
}

			
function CreateMessageDate(t,stateinfo,info)
{
	return new Object({openid:t._openid,"character_string1":{"value":t._id},"phrase2":{"value":stateinfo},"name5":{"value":"吴志其"},"thing7":{"value":t.Type},"thing6":{"value":info}})
}
module.exports={
	SendMessage,
	 CreateMessageDate
}