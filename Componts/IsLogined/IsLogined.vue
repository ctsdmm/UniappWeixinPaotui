<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Name:null
			}
		},
		created(){	
		this.initData();
		},
		methods: {
			
			initData()
			{
				this.Name = this.$parent.nickName
				console.log('parant',Name)
			},
		}
	}
</script>

<style>

</style>
