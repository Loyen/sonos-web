Vue.component('sonos-button', {
	props: {
		name: { required: true },
		classes: { default: '' }
	},
	template: `
		<div class="button" :class="classes" @click="triggerClick">{{ name }}</div>
	`,
	methods: {
		triggerClick() {
			this.$emit('clicked');
		}
	}
});
