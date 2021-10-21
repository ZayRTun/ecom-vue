<template>
	<div class="h-full">
		<div class="h-full flex flex-col">
			<div class="flex-shrink-0 bg-secondary px-3 h-12 text-white">
				<div class="flex items-center justify-between h-12">
					<div class="flex items-center">
						<span>
							<svg
								class="w-6 h-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</span>
						<span class="ml-2 font-semibold">{{ cart.length }}</span>
						<span class="ml-2">Items</span>
					</div>
					<div>Delivery Location</div>
				</div>
			</div>
			<div class="h-5">
				<v-progress :progressbar-threshold="threshold" />
			</div>
			<div class="flex-grow mt-3 overflow-y-auto pl-3 pr-3">
				<div>
					<div v-for="item in cart" :key="item.id" class="flex mb-4 text-sm">
						<div>
							<div class="flex flex-col items-center">
								<button v-on:click="incrementQty(item)">
									<svg
										class="w-5 text-gray-600"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
								<span class="text-xs leading-tight">{{ item.quantity }}</span>
								<button v-on:click="decrementQty(item)">
									<svg
										class="w-5 text-gray-600"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div class="pl-3 flex items-center">
							<img class="h-12 object-cover w-12" :src="getSmallImage(item.image)" alt="Product image" />
						</div>
						<div class="px-2 flex-1 flex items-center text-xs">{{ item.name }}</div>
						<div class="flex items-center justify-end">
							<span class="text-xs text-gray-600">Ks</span>
							<span>{{ getFormattedPrice(item.price) }}</span>
						</div>
						<div class="ml-3 flex items-center">
							<button>
								<svg
									class="w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="flex-shrink-0 border-t-2 border-secondary px-3">
				<div class="py-3">
					<div class="flex">
						<div class="flex items-center justify-start mr-4 w-2/3">Subtotal</div>
						<div class="flex flex-1 items-baseline justify-end">
							<span class="text-xs text-gray-600">Ks</span>
							<span>{{ subtotal.formatted }}</span>
						</div>
						<div class="ml-3 flex items-center">
							<span class="invisible">
								<svg
									class="w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div class="flex">
						<div class="bg-red-200 flex items-center justify-start mr-4 w-2/3">
							Discount
							<span class="text-xs pl-1">( 20% )</span>
						</div>
						<div class="flex flex-1 items-baseline justify-end">
							<span class="text-xs text-gray-600">&minus;Ks</span>
							<div>200</div>
						</div>
						<div class="ml-3 flex items-center">
							<button>
								<svg
									class="w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div class="border-t py-3">
					<div class="flex">
						<div class="flex items-center justify-start mr-4 text-sm w-2/3">New Subtotal</div>
						<div class="flex flex-1 items-baseline justify-end">
							<span class="text-xs text-gray-600">Ks</span>
							<span>{{ subtotal.formatted }}</span>
						</div>
						<div class="ml-3 flex items-center">
							<span class="invisible">
								<svg
									class="w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div class="flex">
						<div class="flex items-center justify-start mr-4 w-2/3">Tax Rate</div>
						<div class="flex flex-1 items-baseline justify-end">
							<span class="text-xs text-gray-600">Ks</span>
							<span>{{ taxedAmount }}</span>
						</div>
						<div class="ml-3 flex items-center">
							<span class="invisible">
								<svg
									class="w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div class="flex">
						<div class="flex items-center justify-start mr-4 w-2/3">Delivery</div>
						<div class="flex flex-1 items-baseline justify-end">
							<span class="text-xs text-gray-600">Ks</span>
							<span class="">Delicery</span>
						</div>
						<div class="ml-3 flex items-center">
							<span class="invisible">
								<svg
									class="w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										w-full
										h-full
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</span>
						</div>
					</div>
				</div>
				<div class="border-t py-3">
					<div class="flex items-baseline">
						<div class="flex items-center justify-start mr-4 text-base w-2/3 font-semibold">Total</div>
						<div class="flex flex-1 items-baseline justify-end text-gray-700 font-semibold">
							<span class="text-xs text-gray-600">Ks</span>
							<span>{{ total }}</span>
						</div>
						<div class="ml-3 flex items-center">
							<span class="invisible">
								<svg
									class="w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="flex-shrink-0 text-white">
					<div class="flex h-full">
						<div class="flex flex-1 items-center justify-center">
							<button class="h-full bg-accent text-2xl uppercase w-full py-2">Place Order</button>
						</div>
						<div class="flex bg-secondary items-center px-4 font-semibold">
							<span class="pr-1">Ks</span>
							<div>{{ total }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	// props: {
	// 	showCart: Boolean,
	// },
	computed: {
		...mapGetters({
			cart: "cart/cart",
			deliveryThreshold: "cart/deliveryThreshold",
		}),

		threshold() {
			let val = Math.floor((this.subtotal.raw / this.deliveryThreshold) * 100);
			return val >= 100 ? 100 : val;
		},

		minDelivery() {
			return {
				formatted: Intl.NumberFormat().format(this.deliveryThreshold),
				raw: this.deliveryThreshold,
			};
		},

		subtotal() {
			let subtotal = 0;
			this.cart.forEach((item) => {
				subtotal += (item.price * item.quantity) / 100;
			});
			return {
				formatted: Intl.NumberFormat().format(Math.ceil(subtotal)),
				raw: subtotal,
			};
		},

		taxedAmount() {
			let amount = this.subtotal.raw * (10 / 100);
			return Intl.NumberFormat().format(Math.ceil(amount));
		},

		total() {
			return this.subtotal.formatted;
		},
	},

	methods: {
		getFormattedPrice: (price) => Intl.NumberFormat().format(Math.ceil(price / 100)),

		incrementQty(product) {
			this.$store.dispatch("cart/incrementQty", product);
		},

		decrementQty(product) {
			this.$store.dispatch("cart/decrementQty", product);
		},

		getSmallImage(image) {
			let edited = image.replace(".jpg", "-small.jpg");
			return `${window.location.origin}/storage/${edited}`;
		},
	},
};
</script>

<style>
</style>