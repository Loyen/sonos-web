Vue.component('sonos-search', {
	template: `
		<div class="search">

			<sonos-card>

				<div class="input input--fill">
					<input class="input-text textfield--search" v-model="search" v-on:input="triggerSearch($event.target.value)" />
				</div>

			</sonos-card>

			<div class="list list--search">

				<sonos-search-result v-for="track,trackid in results" @trackTrigger="trackTrigger" :trackid="trackid" :artist="track.artist" :title="track.title" :length="track.length"></sonos-search-result>

			</div>

		</div>
	`,
	data() {
		return {
			search: '',
			results: []
		};
	},
	methods: {
		triggerSearch(search) {
			this.results = [];
			var artists = [
				'Michael Cera',
				'Lorem Ipsum',
				'Foo Bar',
				'That Guy',
				'Various Artists',
				'Steve Carell',
				'Anonymous',
				'Mr Nobody',
				'Gentleman'
			];
			var titles = [
				'Hello world',
				'Forever Young',
				'I am a man',
				'Diamonds are forever',
				'The creator of destruction',
				'Stuff I like to sing about',
				'The man your man could smell like',
				'Hey man, nice shot',
				'M\'lady'
			];

			for (var i = 0; i < Math.floor(Math.random() * 40); i++) {
				var track = {
					artist: artists[Math.floor(Math.random() * artists.length)],
					title: titles[Math.floor(Math.random() * titles.length)],
					length: Math.floor(Math.random() * 20)+':'+Math.floor(Math.random() * 60)
				};
				var trackid = Math.floor(Math.random() * 9999);

				this.results.push(track);
			}
		},

		trackTrigger(data) {
			var action = data.action;
			var track = data.track;

			if (action == 'play') {
				this.$root.addToQueue(track, true);
				this.$root.nextTrack(false);
			} else if (action == 'playNext') {
				this.$root.addToQueue(track, true);
			} else if (action == 'playLast') {
				this.$root.addToQueue(track, false);
			}
		}
	}
});

Vue.component('sonos-search-result', {
	props: {
		trackid: { required: true },
		artist: { required: true },
		title: { required: true },
		length: { required: true }
	},
	template: `
		<div class="listItem">
			<div class="listItem-header">{{ artist }}</div>
			<div class="listItem-body">{{ title }}</div>
			<div class="listItem-footer">
				<sonos-button name="Play" classes="button--primary button--colored" @clicked="play"></sonos-button>
				<sonos-button name="Play next" classes="button--flat" @clicked="playNext"></sonos-button>
				<sonos-button name="Play last" classes="button--flat" @clicked="playLast"></sonos-button>
			</div>
		</div>
	`,
	computed: {
		track() {
			return {
				trackid: this.trackid,
				artist: this.artist,
				title: this.title,
				length: this.length
			};
		}
	},
	methods: {
		play() {
			this.$emit('trackTrigger', {
				'action': 'play',
				'track': this.track
			});
		},
		playNext() {
			this.$emit('trackTrigger', {
				'action': 'playNext',
				'track': this.track
			});
		},
		playLast() {
			this.$emit('trackTrigger', {
				'action': 'playLast',
				'track': this.track
			});
		}
	}
});
