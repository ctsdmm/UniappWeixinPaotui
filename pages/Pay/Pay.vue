<template>
	<view>
	<button type="primary" @click="payButton">立即支付</button>
	</view>
	
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Pay from '../../Componts/Pay/PayTrade.js'
import {insertDbTrade} from'../../Componts/DataBase/TradeManage.js'
	export default {
		data() {
			return {
					IsFinsish:false
			}
		},
		
		computed:{
			...mapState(['TradeNum','Payment'])
		},
		
		methods: {
			...mapMutations(['setPayment','initPayMission']),
		
			payButton()
			{
				
				console.log('模拟支付场景不付钱')
				insertDbTrade()
				Pay.ToPay()
			}
		}
	}
</script>

<style>

</style>
