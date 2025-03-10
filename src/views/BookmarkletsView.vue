<template>
    <div class="bookmarklets-view">
      <h1 class="text-xl font-bold mb-4">Bookmarklets</h1>
      <p>Bookmarklets are browser bookmarks that execute JavaScript (code) instead of opening a webpage. They can do some pretty cool things with the website you are on, as you will see below.</p>
      <p>Drag the bookmarklet buttons to your bookmarks bar, and click them on the website you want to use them on.</p>
      <p>You can click the buttons below to test it out on this site!</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="bookmarklet in bookmarklets" :key="bookmarklet.name" class="p-4 border rounded-lg shadow">
          <h2 class="text-lg font-semibold">{{ bookmarklet.name }}</h2>
          <p class="text-sm text-gray-600">{{ bookmarklet.description }}</p>
          <a 
            class="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            :href="bookmarklet.code"
            :draggable="true"
            @dragstart="(event) => onDragStart(event, bookmarklet.code)"
          >{{ bookmarklet.name }}</a>
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
            name: 'Tab Cloak',
            description: 'Disguise any website you\'re on as Canvas, Desmos, or Google Drive!',
            code: "javascript:(function () {var a = document.createElement('script');a.src = 'data:text/javascript;base64,dmFyIGw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigibGlua1tyZWwqPSdpY29uJ10iKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgibGluayIpO2wudHlwZT0iaW1hZ2UveC1pY29uIixsLnJlbD0ic2hvcnRjdXQgaWNvbiI7dmFyIGM9cHJvbXB0KCJTZWxlY3QgYSB0YWIgY2xvYWtcbjEuIENhbnZhc1xuMi4gZS1oYWxscGFzc1xuMy4gTmV3IFRhYiIpOzE9PWM/KGwuaHJlZj0iaHR0cHM6Ly9oYXJyaXNvbmJ1cmcuaW5zdHJ1Y3R1cmUuY29tL2Zhdmljb24uaWNvIixkb2N1bWVudC50aXRsZT0iRGFzaGJvYXJkIik6Mj09Yz8obC5ocmVmPSJodHRwczovL2VkdXNwaXJlc29sdXRpb25zLm9yZy93cC1jb250ZW50L3VwbG9hZHMvMjAyMC8wOS9jcm9wcGVkLWZhdmljb24tMjcweDI3MC0xLTE1MHgxNTAucG5nIixkb2N1bWVudC50aXRsZT0iRGlnaXRhbCBIYWxsIFBhc3MgfCBlLUhhbGwgUGFzcyB8IEVkdXNwaXJlIFNvbHV0aW9ucyIpOjM9PWMmJihsLmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUNBWUFBQUFmOC85aEFBQUEvVWxFUVZSNDJxMlMwUTNDTUF4RUdZRVJHSUZQMUZKMEpFWGlrdzFnQTlnQU5xQWJ3Q2FNd0FnZG9TTkFIcFZSRTdVSUlTS2QxRHErczMzTzZPOUgwbmd1ZHl6azY3bjhvMFY1eitVdk02MG5IOGtMK1cwZ05KQUcwT1J5aDE1eUpyY2o2UnRRYUtqMVYvVlFoZmIzTTJreWhJZ2NrcXRXb0R4QkppSFRha29jMk96aC9vZ1hJT29Da3dxVlowUUsrUTJFeElzR1FlYTNXQkNwM3dJV0pLbjlYMVk5czFkMDFvMmxBdUQyazBDOGN5bVRwbVlvNEJ0eXZDbDM3M3B3NnM2R0J4RE1SQVRUUXNSN1YyZ2l1SXdJZDdhQnRLT3ZIaEpDNlZaeWxmMnZrVFhGbmJpNmpmdXJWUzVDb2RHblk3TmprcjBKWnNjbkcrZXY1d2wxQnVrcWM0Q0I3Z0FBQUFCSlJVNUVya0pnZ2c9PSIsZG9jdW1lbnQudGl0bGU9Ik5ldyBUYWIiKTs=';document.body.appendChild(a);}())" 
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