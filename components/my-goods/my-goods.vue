<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio @click="radioClickHandler" :checked="goods.goods_state" color="#c00000" v-if="showRadio"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
																<!-- 调用过滤器保留两位小数 -->
				<view class="goods-price">￥{{goods.goods_price | toFixed}}</view>	
				<uni-number-box :min="1" @change="numChangeHandler" :value="goods.goods_count" v-if="showNum"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default() {
					return {}
				}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				defaultPic: '../../static/my.jpg', //默认图片地址
			};
		},
		// 过滤器：保留两位小数
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClickHandler() {
				this.$emit('radio-change', {
					
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
	
		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-pic {
				width: 100px;
				height: 100px;
	
				display: block;
			}
		}
	
		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			.goods-name {
				font-size: 13px;
			}
	
			.goods-info-box {
				display: flex;
				justify-content: space-between;
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>