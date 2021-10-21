<template>
	<div class="h-screen flex flex-col">
		<app-navbar-basic />

		<main class="flex-1 container mx-auto">
			<slot></slot>
		</main>
	</div>
</template>

<script>
import AppNavbarBasic from "../components/AppNavbarBasic";
export default {
	components: { AppNavbarBasic },
};
</script>

<style>
</style>