<template>
  <main class="flex flex-col items-center justify-center h-full w-full space-y-8">
    <h1 class="text-3xl font-bold mb-4">Unix Timestamp Converter</h1>

    <!-- Live Unix Time -->
    <div class="w-full text-center">
      <h2 class="text-xl font-bold">Current Unix Timestamp</h2>
      <p class="text-2xl">{{ liveUnix }}</p>
      <p class="text-lg">{{ liveDate }}</p>
    </div>

    <!-- Unix Timestamp to Date -->
    <div class="w-full">
      <label class="block text-lg mb-1">Convert Unix Timestamp to Date</label>
      <input
        type="number"
        v-model="timestampInput"
        @input="convertTimestamp"
        class="w-full p-2 border-0 rounded-lg bg-gray-800"
        placeholder="Enter Unix Timestamp (ms or s)"
      />
      <div v-if="timestampResult" class="mt-4 p-4 rounded-lg w-full bg-gray-800">
        <p><strong>Date & Time:</strong> {{ timestampResult }} <button @click="copyToClipboard(timestampResult)">📋</button></p>
        <p><strong>Timezone:</strong> {{ timezone }}</p>
        <p><strong>Relative Time:</strong> {{ relativeTime }}</p>
      </div>
    </div>

    <!-- Date to Unix Timestamp -->
    <div class="w-full">
      <label class="block text-lg mb-1">Convert Date to Unix Timestamp</label>
      <div class="grid grid-cols-2 gap-2">
        <input type="number" v-model="year" placeholder="Year" class="p-2 rounded-lg bg-gray-800" />
        <input type="number" v-model="month" placeholder="Month (1-12)" class="p-2 rounded-lg bg-gray-800" />
        <input type="number" v-model="day" placeholder="Day" class="p-2 rounded-lg bg-gray-800" />
        <input type="number" v-model="hour" placeholder="Hour" class="p-2 rounded-lg bg-gray-800" />
        <input type="number" v-model="minute" placeholder="Minute" class="p-2 rounded-lg bg-gray-800" />
        <input type="number" v-model="second" placeholder="Second" class="p-2 rounded-lg bg-gray-800" />
      </div>
      <button @click="convertDateToUnix" class="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white">Convert</button>
      <div v-if="unixResult !== null" class="mt-4 p-4 rounded-lg w-full bg-gray-800">
        <p><strong>Unix Timestamp:</strong> {{ unixResult }} <button @click="copyToClipboard(unixResult)">📋</button></p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      liveUnix: Math.floor(Date.now() / 1000),
      liveDate: new Date().toLocaleString(),
      timestampInput: "",
      timestampResult: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      relativeTime: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      second: "",
      unixResult: null,
      interval: null,
      relativeInterval: null,
    };
  },
  methods: {
    updateLiveTime() {
      this.liveUnix = Math.floor(Date.now() / 1000);
      this.liveDate = new Date().toLocaleString();
    },
    convertTimestamp() {
      let input = Number(this.timestampInput);
      if (isNaN(input)) return;
      // Detect if timestamp is in milliseconds
      if (input > 1e12) {
        input = input;
      } else {
        input *= 1000;
      }
      const date = new Date(input);
      this.timestampResult = date.toLocaleString();
      this.updateRelativeTime(input);
    },
    convertDateToUnix() {
      const date = new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
      this.unixResult = date.getTime();
    },
    updateRelativeTime(targetTimeMs = null) {
      const now = Date.now();
      const target = targetTimeMs !== null ? targetTimeMs : (Number(this.timestampInput) > 1e12 ? Number(this.timestampInput) : Number(this.timestampInput) * 1000);
      const diff = target - now;
      const absDiff = Math.abs(diff);
      const seconds = Math.floor(absDiff / 1000) % 60;
      const minutes = Math.floor(absDiff / (1000 * 60)) % 60;
      const hours = Math.floor(absDiff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));

      const parts = [];
      if (days) parts.push(`${days}d`);
      if (hours) parts.push(`${hours}h`);
      if (minutes) parts.push(`${minutes}m`);
      if (seconds || parts.length === 0) parts.push(`${seconds}s`);

      this.relativeTime = diff >= 0 ? `In ${parts.join(' ')}` : `${parts.join(' ')} ago`;
    },
    copyToClipboard(value) {
      navigator.clipboard.writeText(value).then(() => {
        alert('Copied to clipboard!');
      });
    }
  },
  mounted() {
    this.interval = setInterval(this.updateLiveTime, 1000);
    this.relativeInterval = setInterval(() => {
      if (this.timestampInput) {
        this.updateRelativeTime();
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    clearInterval(this.relativeInterval);
  },
};
</script>
