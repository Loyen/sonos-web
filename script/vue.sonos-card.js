Vue.component('sonos-card', {
	props: [ 'name' ],

	template: `
		<div class="card raise raise--1">
			<div class="card-header" v-if="name">
				{{ name }}
			</div>

			<div class="card-body">
				<slot></slot>
			</div>
		</div>
	`
});
