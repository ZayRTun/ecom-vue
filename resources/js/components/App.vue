<template>
	<div>
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>

<script>
const default_layout = "default";
// import algoliasearch from "algoliasearch/lite";

// import { mapGetters } from "vuex";d
// import shoppingCart from "../components/ShoppingCart";

export default {
	// components: {
	// 	shoppingCart,
	// },
	// data() {
	// 	return {
	// 		searchClient: algoliasearch("B9TFKG8PJ7", "58bce13cd2ee3d39a3e8f47db02a514e"),
	// 		sideBar: false,
	// 		showCart: true,
	// 	};
	// },
	computed: {
		layout() {
			return (this.$route.meta.layout || default_layout) + "-layout";
		},
	},
	// computed: mapGetters({
	// 	authenticated: "auth/check",
	// }),
};
</script>
<style>
</style>
