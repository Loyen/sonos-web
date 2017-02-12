Vue.component('sonos-tabs', {
	template: `
		<div class="tabs">
			<div class="tabs-bar raise raise--2">
				<div class="container">
					<div class="tabs-tab" :class="{ isActive: tab.isActive }" v-for="tab in tabs" @click="selectTab(tab)">
						<div class="icon icon--tab" :class="icon(tab.name)"></div>
						<div>{{ tab.name }}</div>
					</div>
				</div>
			</div>

			<slot></slot>
		</div>
	`,
	data() {
		return {
			tabs: []
		};
	},
	created() {
		this.tabs = this.$children;
	},
	methods: {
		icon(name) {
			return 'icon--'+name.toLowerCase();
		},
		selectTab(current) {
			this.tabs.forEach(tab => {
				tab.isActive = (current.name == tab.name);
			});
		}
	}
});

Vue.component('sonos-tab', {
	props: {
		name: { required: true },
		selected: { default: false }
	},

	template: `
		<div class="tabs-content" :class="{ isActive: isActive }">
			<div class="container">
				<div>
					<slot></slot>
				</div>
			</div>
		</div>
	`,

	data() {
		return {
			isActive: false
		};
	},

	mounted() {
		this.isActive = this.selected;
	}
});
