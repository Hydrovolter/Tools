<template>
  <main class="flex flex-col items-center justify-center h-full w-full">
    <h1 class="text-3xl font-bold mb-4">Discord Snowflake Deconstructor</h1>
    <div class="w-full">
      <label for="snowflake" class="block text-lg mb-1">Enter Snowflake</label>
      <input 
        type="text" 
        v-model="snowflake" 
        @input="deconstructSnowflake" 
        class="w-full p-2 border-0 rounded-lg bg-gray-800" 
        placeholder="Enter Discord Snowflake" 
      />
    </div>
    <div v-if="result" class="mt-4 p-4 rounded-lg w-full" :class="resultColor">
      <h2 class="text-xl font-bold">Result:</h2>
      <p>{{ result }}</p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      snowflake: "",
      result: "",
      resultColor: "",
    };
  },
  methods: {
    deconstructSnowflake() {
      const value = this.snowflake.trim();
      if (!value) {
        history.replaceState(null, "", "/snowflake");
        this.result = "";
        return;
      }
      if (!/^\d+$/.test(value) || value < 4194304 || value > 9223372036854775807) {
        history.replaceState(null, "", "/snowflake");
        this.resultColor = "text-red-500";
        this.result = "Invalid Snowflake";
        return;
      }
      this.resultColor = "text-green-500";
      this.result = new Date(value / 4194304 + 1420070400000).toLocaleString();
      history.replaceState(null, "", "/snowflake/" + value);
    },
  },
  mounted() {
    const path = window.location.pathname;
    const match = path.match(/^\/snowflake\/(\d+)$/);
    if (match) {
      this.snowflake = match[1];
      this.deconstructSnowflake();
    }
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
