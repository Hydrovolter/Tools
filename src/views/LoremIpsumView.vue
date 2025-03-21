<template>
    <main class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-3xl font-bold mb-4">Lorem Ipsum Generator</h1>
      
      <div class="w-full">
        <label class="block text-lg mb-1">Generation Type</label>
        <select v-model="type" class="w-full p-2 border-0 rounded-lg bg-gray-800">
          <option value="paragraphs">Paragraphs</option>
          <option value="words">Words</option>
          <option value="characters">Characters</option>
          <option value="bytes">Bytes</option>
          <option value="lists">Lists</option>
        </select>
      </div>
  
      <div class="w-full mt-4">
        <label class="block text-lg mb-1">Amount</label>
        <input type="number" v-model.number="amount" class="w-full p-2 border-0 rounded-lg bg-gray-800" placeholder="Enter amount" />
      </div>
  
      <div class="w-full mt-4">
        <label class="flex items-center">
          <input type="checkbox" v-model="includeHtml" class="mr-2" />
          Wrap in HTML tags
        </label>
      </div>
  
      <button @click="generate" class="mt-4 p-2 bg-blue-600 rounded-lg">Generate</button>
  
      <div v-if="output" class="mt-4 p-4 bg-gray-700 rounded-lg w-full">
        <h2 class="text-xl font-bold">Generated Text:</h2>
        <p v-html="output"></p>
      </div>
    </main>
  </template>
  
  <script>
  const loremIpsumBase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  export default {
    data() {
      return {
        type: "paragraphs",
        amount: 1,
        includeHtml: false,
        output: "",
      };
    },
    methods: {
      generate() {
        let result = "";
        const words = loremIpsumBase.split(" ");
        
        switch (this.type) {
          case "paragraphs":
            result = Array.from({ length: this.amount }, () => loremIpsumBase).join("\n\n");
            break;
          case "words":
            result = words.slice(0, this.amount).join(" ");
            break;
          case "characters":
            result = loremIpsumBase.substring(0, this.amount);
            break;
          case "bytes":
            result = loremIpsumBase.substring(0, this.amount); // Simplified for now
            break;
          case "lists":
            result = `<ul>${Array.from({ length: this.amount }, () => `<li>${loremIpsumBase}</li>`).join("")}</ul>`;
            break;
        }
        
        this.output = this.includeHtml ? result.replace(/\n/g, "<br>") : result;
      },
    },
  };
  </script>
  
  <style scoped>
  input:focus, select:focus, button:focus {
    outline: none;
  }
  </style>
  