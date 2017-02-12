app = new Vue({
	el: '.app',
	data: {
		current_deviceid: null,
		devices: [
			{
				name: 'Living room',
				ip: '192.168.0.101',
				playing: false,
				repeat: false,
				shuffle: false,
				current_trackid: null,
				tracks: []
			},
			{
				name: 'Kitchen',
				ip: '192.168.0.102',
				playing: false,
				repeat: false,
				shuffle: false,
				current_trackid: null,
				tracks: []
			},
			{
				name: 'Bedroom',
				ip: '192.168.0.103',
				playing: false,
				repeat: false,
				shuffle: false,
				current_trackid: null,
				tracks: []
			},
			{
				name: 'Bathroom',
				ip: '192.168.0.104',
				playing: false,
				repeat: false,
				shuffle: false,
				current_trackid: null,
				tracks: []
			},
			{
				name: 'Basement',
				ip: '192.168.0.105',
				playing: false,
				repeat: false,
				shuffle: false,
				current_trackid: null,
				tracks: []
			},
			{
				name: 'Entrance',
				ip: '192.168.0.106',
				playing: false,
				repeat: false,
				shuffle: false,
				current_trackid: null,
				tracks: []
			}
		]
	},
	created() {
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

		this.devices.forEach(device => {
			for (var i = 0; i < Math.floor(Math.random() * 40); i++) {
				var track = {
					artist: artists[Math.floor(Math.random() * artists.length)],
					title: titles[Math.floor(Math.random() * titles.length)],
					length: Math.floor(Math.random() * 20)+':'+Math.floor(Math.random() * 60)
				};
				var trackid = Math.floor(Math.random() * 9999);

				device.tracks.push(track);
			}
		});
	},
	computed: {
		hasDevice() {
			return this.current_deviceid != null;
		},

		hasTrack() {
			return this.current_trackid != null;
		},

		isPlaying() {
			if (!this.hasDevice) return false;

			return this.current_device.playing;
		},

		tracks() {
			if (this.current_deviceid == null) return [];

			return this.current_device.tracks;
		},

		emptyQueue() {
			return this.tracks.length == 0;
		},

		current_device() {
			if (this.current_deviceid == null) return null;

			return this.devices[this.current_deviceid];
		},

		current_track() {
			if (this.current_trackid == null) return null;

			return this.tracks[this.current_trackid];
		},

		current_trackid() {
			if (!this.hasDevice) return null;

			return this.current_device.current_trackid;
		},

		repeat() {
			if (!this.hasDevice) return null;

			return this.current_device.repeat;
		},

		shuffle() {
			if (!this.hasDevice) return null;

			return this.current_device.shuffle;
		},

		previous_trackid() {
			var current_trackid = this.$root.current_trackid;
			var previous_trackid = null;
			var trackIndex = Object.keys(this.tracks);

			for (var trackid of trackIndex) {
				if (trackid == current_trackid) break;
				previous_trackid = trackid;
			}

			return previous_trackid;
		},

		next_trackid() {
			var current_trackid = this.$root.current_trackid;
			var next_trackid = null;
			var isNext = false;
			var trackIndex = Object.keys(this.tracks);

			for (var trackid of trackIndex) {
				if (isNext)
				{
					next_trackid = trackid;
					break;
				}

				if (trackid == current_trackid) isNext = true;
			}

			if (!next_trackid && this.repeat && this.tracks.length > 0) {
				var trackIndex = Object.keys(this.tracks);
				next_trackid = trackIndex[0];
			}

			return next_trackid;
		}
	},
	methods: {
		random_trackid() {
			var trackIndex = Object.keys(this.tracks);
			return trackIndex[Math.floor(Math.random() * trackIndex.length)];
		},

		playTrack(trackid) {
			if (trackid != null && this.current_trackid != trackid) this.current_device.current_trackid = trackid;
			if (!this.hasTrack) this.current_device.current_trackid = Object.keys(this.tracks)[0];
			if (this.hasTrack && !this.current_device.playing) this.current_device.playing = true;

			return true;
		},

		previousTrack(allowShuffle) {
			if (typeof(allowShuffle) == "undefined") allowShuffle = true;
			var trackid = allowShuffle && this.shuffle ? this.random_trackid() : this.previous_trackid;
			return this.playTrack(trackid);
		},

		nextTrack(allowShuffle) {
			if (typeof(allowShuffle) == "undefined") allowShuffle = true;
			var trackid = allowShuffle && this.shuffle ? this.random_trackid() : this.next_trackid;
			return this.playTrack(trackid);
		},

		pauseTrack() {
			if (!this.hasTrack || this.current_device.playing) this.current_device.playing = false;

			return true;
		},

		addToQueue(track, next)
		{
			if (!this.hasDevice || !track) return false;

			if (next) {
				this.current_device.tracks.splice(this.next_trackid, 0, track);
			} else {
				this.current_device.tracks.push(track);
			}

			return true;
		},

		toggleShuffle() {
			if (!this.hasDevice) return false;

			this.current_device.shuffle = this.current_device.shuffle ? false : true;

			return true;
		},

		toggleRepeat() {
			if (!this.hasDevice) return false;

			this.current_device.repeat = this.current_device.repeat ? false : true;

			return true;
		},
	}
});
