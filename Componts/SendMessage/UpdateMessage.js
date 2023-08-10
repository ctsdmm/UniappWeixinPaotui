function UpdateMessage(){
	
	
	
	// 发送模板消息
				wx.getSetting({
					withSubscriptions: true,
				
					}).then(res=>
					{
		
						// 判断是否发送消息
						if(res.res.subscriptionsSetting["XZDhNKaFi3rr93MbY-ZGJ2XkCZsJ2JG2o_o8qDsQugw"]=='accept')
						{
							wx.cloud.callFunction({
										  name: 'subscribe',
										  data: {
											data: {"phrase3":{"value":"已经接单"},"name8":{"value":"吴志其"},"character_string10":{"value":"201456678"}},
											templateId: ['XZDhNKaFi3rr93MbY-ZGJ2XkCZsJ2JG2o_o8qDsQugw'],
										  },
										})
										.then(() => {
							
										  })
						}
						
						
				
	})
						
			
							
}



module.exports={
	UpdateMessage

}