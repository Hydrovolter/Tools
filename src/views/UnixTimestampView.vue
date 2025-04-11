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
        placeholder="Enter Unix Timestamp"
      />
      <div v-if="timestampResult" class="mt-4 p-4 rounded-lg w-full bg-gray-800">
        <p><strong>Date & Time:</strong> {{ timestampResult }}</p>
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
        <p><strong>Unix Timestamp:</strong> {{ unixResult }}</p>
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
    };
  },
  methods: {
    updateLiveTime() {
      const now = new Date();
      this.liveUnix = Math.floor(now.getTime() / 1000);
      this.liveDate = now.toLocaleString();
    },
    convertTimestamp() {
      const timestamp = Number(this.timestampInput);
      if (!timestamp) {
        this.timestampResult = "";
        this.relativeTime = "";
        return;
      }
      const date = new Date(timestamp * 1000);
      this.timestampResult = date.toLocaleString();
      this.relativeTime = this.getRelativeTime(date);
    },
    getRelativeTime(date) {
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);

      if (diff < 5) return "Just now";
      if (diff < 60) return `${diff} second${diff !== 1 ? "s" : ""} ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? "s" : ""} ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? "s" : ""} ago`;
      if (diff < 2592000) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? "s" : ""} ago`;
      if (diff < 31536000) return `${Math.floor(diff / 2592000)} month${Math.floor(diff / 2592000) !== 1 ? "s" : ""} ago`;
      return `${Math.floor(diff / 31536000)} year${Math.floor(diff / 31536000) !== 1 ? "s" : ""} ago`;
    },
    convertDateToUnix() {
      const date = new Date(
        this.year,
        this.month - 1,
        this.day,
        this.hour,
        this.minute,
        this.second
      );
      if (isNaN(date.getTime())) {
        this.unixResult = "Invalid date";
      } else {
        this.unixResult = Math.floor(date.getTime() / 1000);
      }
    },
  },
  mounted() {
    this.updateLiveTime();
    this.interval = setInterval(this.updateLiveTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
