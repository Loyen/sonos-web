Vue.component('sonos-devices', {
	template: `
		<div class="list">

			<sonos-device v-for="device,deviceid in devices" @trackTrigger="trackTrigger" :isActive="isActive(deviceid)" :isPlaying="isPlaying(deviceid)" :isShuffle="isShuffle(deviceid)" :isRepeat="isRepeat(deviceid)" :deviceid="deviceid" :name="device.name"></sonos-device>

		</div>
	`,
	computed: {
		devices() {
			return this.$root.devices;
		}
	},
	methods: {
		trackTrigger(data) {
			var action = data.action;
			var new_deviceid = data.deviceid;

			if (action == 'select') {
				this.$root.current_deviceid = new_deviceid;
			}
		},

		isActive(deviceid) {
			return deviceid == this.$root.current_deviceid;
		},

		isPlaying(deviceid) {
			return this.$root.devices[deviceid].playing;
		},

		isShuffle(deviceid) {
			return this.$root.devices[deviceid].shuffle;
		},

		isRepeat(deviceid) {
			return this.$root.devices[deviceid].repeat;
		}
	}
});

Vue.component('sonos-device', {
	props: {
		deviceid: { required: true },
		name: { required: true },
		isActive: { default: false },
		isPlaying: { default: false },
		isRepeat: { default: false },
		isShuffle: { default: false }
	},
	template: `
		<div class="listItem raise" :class="{isActive: isActive, 'raise--2': isActive}">
			<div class="listItem-body">{{ name }}</div>
			<div class="listItem-footer">
				<sonos-button name="Use Device" classes="button--primary button--colored" @clicked="selectDevice" v-if="!isActive"></sonos-button>
				<sonos-button name="Current Device" classes="button--disabled button--flat" v-if="isActive"></sonos-button>
				<sonos-button name="Playing" classes="button--disabled button--flat" v-if="isPlaying"></sonos-button>
				<sonos-button name="Repeat" classes="button--disabled button--flat" v-if="isRepeat"></sonos-button>
				<sonos-button name="Shuffle" classes="button--disabled button--flat" v-if="isShuffle"></sonos-button>
			</div>
		</div>
	`,
	methods: {
		selectDevice() {
			this.$emit('trackTrigger', {
				'action': 'select',
				'deviceid': this.deviceid
			});
		}
	}
});
