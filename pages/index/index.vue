<template>
<!--轮播图-->
<view>
	

<view>
	<swiper circular autoplay :interval="3000" :duration="500" indicator-dots style="height: 350rpx;" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#3CB371">
		<swiper-item v-for="item in imgs" :key="item">
			<image :src="item" alt="" mode="widthFix" style="width: 100%;"/>
		</swiper-item>
	</swiper>
</view>
<!--通知-->
<view style="margin: 10px;">
	<view style="padding: 5px 10px; background-color: white; font-size: 12px;border-radius: 5px; display: flex; align-items: center;">
		<uni-icons type="sound" size="20"></uni-icons>
		<text>公告内容</text>
	</view>
</view>
<uni-section title="选择任务" type="line" ></uni-section>
<view>
	<uni-row>
		<uni-col :span="12">
			<view>
				<button  @click="generalMission" type="default">普通任务</button>
			</view>
		</uni-col>
		<uni-col :span="12">
			<view>
				<button  @click="importMission" type="default">紧急任务</button>
			</view>
		</uni-col>
	</uni-row>
</view>
<!-- <button @click="sendMe" >推送消息</button> -->
</view>
</template>

<script>
	import SendMessage, { UpdateMessage } from "../../Componts/SendMessage/UpdateMessage.js"
	export default {
		data() {
			return {
				imgs:[
					"../../static/Images/1.jpg",
					"../../static/Images/2.jpg",
					"../../static/Images/3.jpg"
						],
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
         generalMission()
		 {
		
		// 发送模板消息
					console.log("订阅")
					wx.requestSubscribeMessage({
		// 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
						  tmplIds: ['vQRrzJXTT7I8nQos9QZ1jan5KYjMwhZq8ouK5SCA7QM'],
					      success(res){
							//不管点击拒绝还是什么都要进入新页面
							console.log(res)
							uni.navigateTo({
								url:'../generalMission/generalMission'
							})
						  }
						  })
		 },
		 
		 sendMe()
		 {
			 wx.cloud.callFunction({
			 	name: 'Send',
				success:(res)=>{
					console.log('发送通知')
				},
				})
		 },
		 importMission()
		 {
			// UpdateMessage()
			uni.showToast({
				title:'未开发',
				icon:"none",
				duration:2000
			})
		 }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
