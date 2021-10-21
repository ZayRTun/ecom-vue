<template>
	<nav class="bg-primary px-3 relative">
		<div class="container mx-auto h-12 flex space-x-3 items-center">
			<div class="flex gap-3 items-center">
				<h1 class="hidden md:flex flex-shrink-0 items-center">
					<a href="/"><span class="font-bold text-3xl leading-none text-secondary">eCommerce Site</span></a>
				</h1>
			</div>

			<div class="flex justify-start items-center space-x-5 pl-6 text-white">
				<router-link :to="{ name: 'Home' }">Home</router-link>
				<router-link :to="{ name: 'Products' }">Products</router-link>
				<router-link :to="{ name: 'About' }">About</router-link>
				<router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
			</div>

			<div class="flex-1">
				<input v-model="query" @keyup="sendQuery" type="text" />
			</div>

			<button v-on:click="$emit('toggleCart')">
				<svg
					class="text-white w-8"
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
			</button>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			query: "",
		};
	},

	methods: {
		sendQuery() {
			this.$store.dispatch("query/sendQuery", this.query);
		},
	},
};
</script>

<style>
</style>