Vue.component('sonos-player', {
	props: [ 'name' ],

	template: `
		<div class="player" :class="{ isHidden: !hasDevice }">
			<div class="container">
				<div class="playerItem playerItem--primary" @click="trackTrigger('previous')">
					<sonos-icon name="previousTrack" classes="icon--player"></sonos-icon>
				</div>
				<div class="playerItem playerItem--primary" @click="trackTrigger('pause')" v-if="isPlaying">
					<sonos-icon name="pauseTrack" classes="icon--player"></sonos-icon>
				</div>
				<div class="playerItem playerItem--primary" @click="trackTrigger('play')" v-if="!isPlaying">
					<sonos-icon name="playTrack" classes="icon--player"></sonos-icon>
				</div>
				<div class="playerItem playerItem--primary" @click="trackTrigger('next')">
					<sonos-icon name="nextTrack" classes="icon--player"></sonos-icon>
				</div>
				<div class="playerItem playerItem--secondary" :class="{ isActive: isRepeat }" @click="trackTrigger('repeat')">
					<sonos-icon name="repeatTrack" classes="icon--player"></sonos-icon>
				</div>
				<div class="playerItem playerItem--secondary" :class="{ isActive: isShuffle }" @click="trackTrigger('shuffle')">
					<sonos-icon name="shuffleTrack" classes="icon--player"></sonos-icon>
				</div>
			</div>
			<div class="container" v-if="track">
				<div class="playerTrack">
					{{ device.name }}: "{{ track.artist }} - {{ track.title }}"
				</div>
			</div>
		</div>
	`,
	computed: {
		hasDevice() {
			return this.$root.hasDevice;
		},
		track() {
			return this.$root.current_track;
		},
		device() {
			return this.$root.current_device;
		},
		isShuffle() {
			if (this.device) return this.device.shuffle;
			return false;
		},
		isRepeat() {
			if (this.device) return this.device.repeat;
			return false;
		},
		isPlaying() {
			return this.$root.isPlaying;
		}
	},
	methods: {
		trackTrigger(action) {
			if (action == 'play') {
				this.$root.playTrack();
			} else if (action == 'pause') {
				this.$root.pauseTrack();
			} else if (action == 'previous') {
				this.$root.previousTrack();
			} else if (action == 'next') {
				this.$root.nextTrack();
			} else if (action == 'repeat') {
				this.$root.toggleRepeat();
			} else if (action == 'shuffle') {
				this.$root.toggleShuffle();
			}
		}
	}
});
