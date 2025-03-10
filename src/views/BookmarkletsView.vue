<template>
    <div class="bookmarklets-view">
      <h1 class="text-xl font-bold mb-4">Bookmarklets</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="bookmarklet in bookmarklets" :key="bookmarklet.name" class="p-4 border rounded-lg shadow">
          <h2 class="text-lg font-semibold">{{ bookmarklet.name }}</h2>
          <p class="text-sm text-gray-600">{{ bookmarklet.description }}</p>
          <a 
            class="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            :href="bookmarklet.code"
            :draggable="true"
            @dragstart="(event) => onDragStart(event, bookmarklet.code)"
          >Drag to Bookmarks</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bookmarklets: [
          {
            name: 'Google Search',
            description: 'Search selected text on Google.',
            code: "javascript:(function(){var q=window.getSelection().toString();window.open('https://www.google.com/search?q='+encodeURIComponent(q));})();"
          },
          {
            name: 'Dark Mode',
            description: 'Toggle dark mode on any website.',
            code: "javascript:(function(){document.body.style.filter=document.body.style.filter?'':'invert(1)';})();"
          }
        ]
      };
    },
    methods: {
      onDragStart(event, code) {
        event.dataTransfer.setData('text/plain', code);
      }
    }
  };
  </script>
  
  <style>
  .bookmarklets-view {
    padding: 20px;
  }
  </style>