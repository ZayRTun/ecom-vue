<template>
	<div class="loading-bar">
		<div class="percentage transition-all ease-in-out" :style="{ width: `${percentage}%` }"></div>
	</div>
</template>

<script>
export default {
	name: "VProgress",

	props: {
		progressbarThreshold: Number,
	},

	data() {
		return {
			percentage: 0,
		};
	},

	watch: {
		progressbarThreshold: "start",
	},

	mounted() {
		this.start();
	},

	methods: {
		start() {
			console.log(this.progressbarThreshold);
			this.percentage < this.progressbarThreshold ? this.increase() : this.decrease();
		},

		increase() {
			var intval = setInterval(() => {
				if (this.percentage < this.progressbarThreshold) {
					this.percentage += 1;
				} else {
					clearInterval(intval);
				}
			});
		},

		decrease() {
			var intval = setInterval(() => {
				if (this.percentage > this.progressbarThreshold) {
					this.percentage -= 1;
				} else {
					clearInterval(intval);
				}
			}, 0.1);
		},
	},
};
</script>

<style scoped>
.loading-bar {
	position: relative;
	height: 100%;
	width: 100%;
	/* overflow: hidden; */
	border-bottom: 1px solid #ddd;
	box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff, 0 1px 0 #fff;
}

.percentage {
	position: absolute;
	inset: 0;
	background-color: rgba(89, 152, 92, 1);
}
</style>