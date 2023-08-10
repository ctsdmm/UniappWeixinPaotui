<template>
	<view>
		<button @click="Login">登录</button>
	</view>
</template>

<script>
import Login, { wxGetProfi } from '../../Componts/Login/Login.js'

	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
			Login(){
				console.log('Loging。。。')
				Login.wxGetProfi()	
				Login.wxLogin()
				uni.navigateTo({
					url:"/pages/User/User"
				})
			},
			
		}
	}
</script>

<style>

</style>
