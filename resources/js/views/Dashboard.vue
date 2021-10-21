<template>
	<div class="py-8 flex justify-center items-center">
		<div v-if="user">
			<h1>Dashboard View</h1>
			<div>Name: {{ user.name }}</div>
			<div>Email: {{ user.email }}</div>
			<button @click="logout">Logout</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "Dashboard",

	computed: mapGetters({
		user: "auth/user",
	}),

	methods: {
		async logout() {
			await this.$store.dispatch("auth/logout");

			this.$router.push({ name: "Login" });
		},
	},
};
</script>

<style>
</style>