Vue.component('sonos-icon', {
	props: {
		name: { required: true },
		classes: { defaults: '' },
	},
	template: `
		<div class="icon" :class="[classes, icon_name]"></div>
	`,
	computed: {
		icon_name() {
			return 'icon--'+this.name;
		}
	}
});
