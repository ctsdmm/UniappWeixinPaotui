<script>
	export default {
       
		onLaunch: function() {
			console.log('App Launch')
			// 在这里判断小程序是不是
			
			// console.log('useronLoad')
				this.$store.commit('SetAvart', uni.getStorageSync('avatart'))
				this.$store.commit('SetNickName',uni.getStorageSync('nickName'))
				this.$store.state.isadministrator = uni.getStorageSync('isAdmin')
				this.$store.state.m_openId = uni.getStorageSync('openID')
				console.log(this.$store.state.NickName_G,this.$store.state.Avart_G)
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
