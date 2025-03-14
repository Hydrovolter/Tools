<template>
    <main class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-3xl font-bold mb-4">Word & Character Counter</h1>
      <div class="w-full h-full flex flex-col items-center">
        <textarea
          id="inputText"
          v-model="inputText"
          @input="updateCounts"
          class="w-full h-48 p-2 border-0 rounded-lg bg-gray-800 resize-none"
          placeholder="Type or paste text here..."
        ></textarea>
        <div class="mt-4 text-lg">
          <p><strong>Word Count:</strong> {{ wordCount }}</p>
          <p><strong>Character Count:</strong> {{ charCount }}</p>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputText: "",
        wordCount: 0,
        charCount: 0,
      };
    },
    methods: {
      updateCounts() {
        this.charCount = this.inputText.length;
        this.wordCount = this.inputText.trim() ? this.inputText.trim().split(/\s+/).length : 0;
      },
    },
  };
  </script>
  
  <style scoped>
  textarea {
    resize: none;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }
  </style>
  