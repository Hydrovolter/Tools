<template>
    <main class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-3xl font-bold mb-4">Text Difference Checker</h1>
      <div class="w-full">
        <label class="block text-lg mb-1">Original Text</label>
        <textarea v-model="originalText" class="w-full p-2 border-0 rounded-lg bg-gray-800 resize-none h-40"></textarea>
      </div>
      <div class="w-full mt-4">
        <label class="block text-lg mb-1">Modified Text</label>
        <textarea v-model="modifiedText" class="w-full p-2 border-0 rounded-lg bg-gray-800 resize-none h-40"></textarea>
      </div>
      <button @click="compareDifferences" class="mt-4 p-2 bg-blue-600 rounded-lg">Compare Differences</button>
      <div v-if="diffResult" class="mt-4 p-4 bg-gray-700 rounded-lg w-full">
        <h2 class="text-xl font-bold">Differences:</h2>
        <p v-html="diffResult" class="whitespace-pre-wrap"></p>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        originalText: "",
        modifiedText: "",
        diffResult: ""
      };
    },
    methods: {
      compareDifferences() {
        const originalWords = this.originalText.split(/(\s+)/);
        const modifiedWords = this.modifiedText.split(/(\s+)/);
        
        let result = "";
        let i = 0, j = 0;
        
        while (i < originalWords.length || j < modifiedWords.length) {
          if (i < originalWords.length && j < modifiedWords.length && originalWords[i] === modifiedWords[j]) {
            result += `<span class='text-white'>${originalWords[i]}</span>`;
            i++; j++;
          } else if (i < originalWords.length && !modifiedWords.includes(originalWords[i])) {
            result += `<span class='text-red-500 line-through'>${originalWords[i]}</span>`;
            i++;
          } else if (j < modifiedWords.length && !originalWords.includes(modifiedWords[j])) {
            result += `<span class='text-green-500'>${modifiedWords[j]}</span>`;
            j++;
          } else {
            i++; j++;
          }
        }
        
        this.diffResult = result;
      }
    }
  };
  </script>
  
  <style scoped>
  textarea:focus, button:focus {
    outline: none;
  }
  </style>
  