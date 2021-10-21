<template>
	<ais-instant-search index-name="products" :search-client="searchClient" :routing="routing">
		<!-- <ais-search-box /> -->
		<ais-configure :query="query"></ais-configure>

		<!-- <div class="left-panel">
			<ais-clear-refinements />
			<h2>Brands</h2>
			<ais-refinement-list attribute="brand" searchable />
			<ais-configure :hitsPerPage="8" />
		</div> -->
		<div>
			<ais-hits>
				<div class="flex flex-col h-full" slot="item" slot-scope="{ item }">
					<div class="h-1/2 flex justify-center items-center">
						<img class="object-cover w-32" :src="getSmallImage(item.image)" alt="Product Image" />
					</div>

					<div class="flex-1 flex flex-col">
						<h1 class="h-1/2 flex-1 text-center text-sm mt-1" style="min-height: 4rem">
							<ais-highlight attribute="name" :hit="item"></ais-highlight>
						</h1>

						<div class="h-1/3 py-1 text-center">
							<p
								class="bg-opacity-25 font-semibold inline-block leading-none px-2 py-1 rounded text-center text-sm"
								:class="getStockLevelClass(item.units_in_stock)"
							>
								<span>{{ getStockLevel(item.units_in_stock) }}</span>
							</p>
						</div>

						<div class="my-2 text-center">
							<p class="text-xs">{{ item.unit_size }}</p>

							<div class="flex items-center justify-center space-x-1">
								<div class="font-semibold inline-flex items-baseline text-gray-700 tracking-tight">
									<span class="text-sm text-gray-500 pr-1">Ks</span>
									<span>{{
										getFormattedPrice(item.discount_available, item.discount, item.price)
									}}</span>
								</div>

								<div v-if="item.discount_available">
									<span class="text-xs line-through tracking-tight text-gray-500 font-semibold"
										>Ks {{ Intl.NumberFormat().format(item.price / 100) }}</span
									>
								</div>
							</div>
						</div>

						<div>
							<div v-if="item.units_in_stock > 0">
								<div v-if="inCart(item)" class="flex">
									<button
										v-on:click="incrementQty(item)"
										:disabled="isDisabled(item)"
										class="card-button-r focus:outline-none"
									>
										<svg
											class="w-5"
											xmlns="http:ww.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
									</button>
									<span
										class="flex-1 flex items-center justify-center bg-secondary text-sm tracking-tight py-px text-white"
										>{{ qtyInCart(item) }} in Cart</span
									>
									<button v-on:click="decrementQty(item)" class="card-button-l focus:outline-none">
										<svg
											class="w-5"
											xmlns="http:ww.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M18 12H6"
											/>
										</svg>
									</button>
								</div>
								<button
									v-if="!inCart(item)"
									class="bg-secondary rounded-md w-full h-7 text-white text-sm py-px"
									v-on:click="addToCart(item)"
								>
									Add to cart
								</button>
							</div>

							<div v-if="!item.units_in_stock > 0">
								<div
									class="bg-gray-400 rounded w-full h-7 text-white flex items-center justify-center"
									disabled
								>
									Not available
								</div>
							</div>
						</div>
					</div>
				</div>
			</ais-hits>
			<ais-pagination />
		</div>
	</ais-instant-search>
</template>


<script>
import algoliasearch from "algoliasearch/lite";
import { history } from "instantsearch.js/es/lib/routers";
import { simple } from "instantsearch.js/es/lib/stateMappings";
// import "instantsearch.css/themes/algolia-min.css";
import "instantsearch.css/themes/reset.css";
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			searchClient: algoliasearch("B9TFKG8PJ7", "58bce13cd2ee3d39a3e8f47db02a514e"),
			routing: {
				router: history(),
				stateMapping: simple(),
			},
		};
	},

	computed: mapGetters({
		cart: "cart/cart",
		query: "query/query",
	}),

	methods: {
		addToCart(product) {
			this.$store.dispatch("cart/addToCart", product);
		},

		incrementQty(product) {
			this.$store.dispatch("cart/incrementQty", product);
		},

		decrementQty(product) {
			this.$store.dispatch("cart/decrementQty", product);
		},

		inCart({ id }) {
			return this.cart.find((p) => p.id === id) ? true : false;
		},

		isDisabled({ id, units_in_stock }) {
			return this.cart.find((p) => p.id === id).quantity === parseInt(units_in_stock) ? true : false;
		},

		qtyInCart({ id }) {
			return this.cart.find((p) => p.id === id).quantity;
		},

		getSmallImage(image) {
			let edited = image.replace(".jpg", "-small.jpg");
			return `${window.location.origin}/storage/${edited}`;
		},

		getStockLevel(unitsInStock) {
			if (unitsInStock > 5) {
				return "In Stock";
			} else if (unitsInStock <= 5 && unitsInStock > 0) {
				return "Low Stock";
			} else {
				return "Out of Stock";
			}
		},

		getStockLevelClass(unitsInStock) {
			if (unitsInStock > 5) {
				return "bg-green-500 text-green-700";
			} else if (unitsInStock <= 5 && unitsInStock > 0) {
				return "bg-yellow-500 text-yellow-700";
			} else {
				return "bg-red-500 text-red-700";
			}
		},

		getFormattedPrice(discount_available, discount, price) {
			let number = discount_available ? (price - (discount / 100) * price) / 100 : price / 100;
			return Intl.NumberFormat().format(Math.ceil(number));
		},

		stockAvailable(unitsInStock) {
			if (unitsInStock > 0) {
				return true;
			} else {
				return false;
			}
		},

		inStock(unitsInStock) {
			if (unitsInStock > 0) {
				return true;
			} else {
				return false;
			}
		},
	},
};
</script>

<style>
button:disabled,
button[disabled] {
	background: grey !important;
}

/* .ais-InstantSearch {
	display: grid;
	grid-template-columns: 1fr 4fr;
	grid-gap: 1em;
} */
</style>
