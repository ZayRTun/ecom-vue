<template>
	<div class="h-screen flex flex-col">
		<app-navbar-default v-on:toggleSidebar="sideBar = !sideBar" v-on:toggleCart="showCart = !showCart">
			<template v-slot:searchbar>
				<slot name="searchbar"></slot>
			</template>
		</app-navbar-default>

		<main class="flex-1 flex w-full relative overflow-y-auto">
			<transition>
				<aside v-show="sideBar" class="absolute md:static bg-red-400 w-64 border-r">
					<slot name="sidebar"></slot>
				</aside>
			</transition>

			<section class="flex-1 flex transition-all ease-in duration-300">
				<main class="w-full h-full overflow-hidden overflow-y-auto">
					<slot></slot>
				</main>

				<transition
					enter-class="opacity-0 -mr-96"
					enter-active-class="duration-300 ease-in"
					enter-to-class="opacity-100 mr-0"
					leave-active-class="duration-300 ease-out"
					leave-to-class="opacity-50 -mr-96"
				>
					<aside
						v-show="showCart"
						class="flex-shrink-0 right-0 h-full bg-white w-full sm:w-96 shadow-2xl z-10 -mt-"
					>
						<shopping-cart />
					</aside>
				</transition>
			</section>
		</main>
	</div>
</template>

<script>
import AppNavbarDefault from "../components/AppNavbarDefault.vue";
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
	components: { AppNavbarDefault, ShoppingCart },
	data() {
		return {
			sideBar: false,
			showCart: false,
		};
	},

	methods: {
		testMethod() {
			console.log("calleding");
		},
	},
};
</script>

<style>
</style>