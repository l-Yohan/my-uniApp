export default {
	namespaced: true,

	state: () => ({
		// {goods_id, goods_name, goods_count, goods_price, goods_small_logo, goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		// 添加商品到购物车数组
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		
		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		
		// 更新购物车添加商品数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 滑动删除购物车商品
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		// 全选
		updateAllState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		},
		
	},


	getters: {
		total(state) {
			// let c = 0;
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			
			// 用reduce
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 以勾选的商品总价
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
		}
	},

}
