Vue.component('sonos-track', {
	props: {
		trackid: { required: true },
		artist: { required: true },
		title: { required: true },
		length: { required: true },
		isActive: { default: false },
		isPlaying: { default: false }
	},
	template: `
		<div class="listItem raise" :class="{isActive: isActive, 'raise--2': isActive}">
			<div class="listItem-header">{{ artist }}</div>
			<div class="listItem-body">{{ title }}</div>
			<div class="listItem-footer">
				<sonos-button name="Play" classes="button--primary button--colored" @clicked="play" v-if="!isPlaying"></sonos-button>
				<sonos-button name="Pause" classes="button--secondary button--colored" @clicked="pause" v-if="isPlaying"></sonos-button>
				<sonos-button name="Play next" classes="button--flat" @clicked="playNext"></sonos-button>
				<sonos-button name="Play last" classes="button--flat" @clicked="playLast"></sonos-button>
			</div>
		</div>
	`,
	methods: {
		play() {
			this.$emit('trackTrigger', {
				'action': 'play',
				'trackid': this.trackid
			});
		},
		pause() {
			this.$emit('trackTrigger', {
				'action': 'pause',
				'trackid': this.trackid
			});
		},
		playNext() {
			this.$emit('trackTrigger', {
				'action': 'playNext',
				'trackid': this.trackid
			});
		},
		playLast() {
			this.$emit('trackTrigger', {
				'action': 'playLast',
				'trackid': this.trackid
			});
		}
	}
});
