<template>
	<div class="flex justify-center py-8">
		<form action="#" method="POST" @submit.prevent="login" class="flex flex-col gap-2">
			<div>
				<input v-model="form.email" type="email" name="email" placeholder="Email" class="rounded" />
			</div>

			<div>
				<input v-model="form.password" type="password" name="password" placeholder="Password" class="rounded" />
			</div>

			<div>
				<input v-model="form.remember" type="checkbox" name="remember" id="" />
			</div>

			<div>
				<button class="border border-gray-500 px-2 rounded" type="submit">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
import Cookies from "js-cookie";
import Form from "../zform/index";

export default {
	name: "Login",

	data() {
		return {
			form: new Form({
				email: "",
				password: "",
				remember: false,
			}),
		};
	},

	methods: {
		async login() {
			await this.form.post("/login");

			this.form.reset();

			await this.$store.dispatch("auth/fetchUser");

			this.redirect();
		},

		redirect() {
			let intendedUrl = Cookies.get("intended_url");

			if (intendedUrl) {
				Cookies.remove("intended_url");

				this.$router.push({ path: intendedUrl });
			}
		},
	},
};
</script>

<style>
</style>