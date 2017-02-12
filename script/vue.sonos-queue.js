Vue.component('sonos-queue', {
	template: `
		<div class="list">

			<sonos-track v-for="track,trackid in tracks" @trackTrigger="trackTrigger" :isActive="isActive(trackid)" :isPlaying="isPlaying(trackid)" :trackid="trackid" :artist="track.artist" :title="track.title" :length="track.length"></sonos-track>

		</div>
	`,
	computed: {
		tracks() {
			return this.$root.tracks;
		}
	},
	methods: {
		trackTrigger(data) {
			var action = data.action;
			var trackid = data.trackid;

			if (action == 'play') {
				this.$root.playTrack(trackid);
			} else if (action == 'pause') {
				this.$root.pauseTrack();
			} else if (action == 'playNext') {
				this.$root.addToQueue(this.tracks[trackid], true);
			} else if (action == 'playLast') {
				this.$root.addToQueue(this.tracks[trackid], false);
			}
		},

		isActive(trackid) {
			return this.$root.hasTrack && trackid == this.$root.current_trackid;
		},

		isPlaying(trackid) {
			return this.isActive(trackid) && this.$root.isPlaying;
		}
	}
});
