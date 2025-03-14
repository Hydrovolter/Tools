<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";

const searchTerm = ref("");
const showMenu = ref(false);
const searchBox = ref(null);
const routes = ref([
  { name: "About this", path: "/" },
  { name: "about:blank Embedder", path: "/aboutblank" },
  { name: "Bookmarklets", path: "/bookmarklets" },
  { name: "Browser Info finder", path: "/browserinfo" },
  { name: "QR Code Maker", path: "/qrcode" },
  { name: "User Agent Info", path: "/useragent" },
  { name: "Pomodoro Timer", path: "/pomodorotimer" },
  { name: "Number Generator", path: "/randomnumber" },
  { name: "Password Generator", path: "/randompassword" },
  { name: "URL Opener", path: "/urlopen" },
  { name: "Coin flip", path: "/coinflip" },
  { name: "Countdown Timer", path: "/timer" },
  { name: "Reaction Time Test", path: "/reactiontime" },
  { name: "Current Time", path: "/currenttime" },
  { name: "Base64 Converter", path: "/base64" },
  { name: "Base32 Converter", path: "/base32" }
]);

routes.value.sort((a, b) => a.name.localeCompare(b.name));

const matchingTools = computed(() => {
  return routes.value.filter((tool) => tool.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const noMatch = computed(() => {
  return routes.value.filter((tool) => !tool.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const now = new Date().toISOString().slice(0, 19).replace("T", " ");
// could use for timing something...

const focusSearch = () => {
  searchBox.value.focus();
};

const showConsent = ref(false);
const consentYea = ref(false);

const handleConsent = () => {
  localStorage.setItem("datacon", "true");
  showConsent.value = false;
  consentYea.value = true;
  injectData();
  setTimeout(() => {
    consentYea.value = false;
  }, 5000);
};

const handleDecline = () => {
  localStorage.setItem("datacon", "false");
  showConsent.value = false;
  consentYea.value = true;
  setTimeout(() => {
    consentYea.value = false;
  }, 5000);
};

const injectData = () => {
};

onMounted(() => {
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      focusSearch();
    }
  });

  const consent = localStorage.getItem("datacon");
  if (!consent) {
    showConsent.value = true;
  } else if (consent === "true") {
    injectData();
  }
});
</script>

<template>
  <div class="bg-[#000011] text-white flex flex-col md:flex-row overflow-hidden h-screen" @keydown.ctrl.k="focusSearch">
    <div class="md:hidden flex justify-between items-center p-2 m-4 mb-0 bg-gray-900 rounded-lg">
      <h1 class="text-2xl font-bold">Tools | Hydrovolter</h1>
      <img src="/svg/menu.svg" alt="Menu" @click="showMenu = !showMenu" class="cursor-pointer w-8 h-8" />
    </div>
    <header :class="{ 'hidden md:flex': !showMenu, 'flex-grow md:hidden md:w-64': showMenu }" class="flex-col items-center md:w-[230px] min-w-[230px] p-2 m-4 bg-gray-900 rounded-lg overflow-y-auto hide-scrollbar">
      <div class="wrapper text-center w-full">
        <h1 class="text-2xl font-bold mb-2">Tools | Hydrovolter</h1>
        <input ref="searchBox" type="text" v-model="searchTerm" autofocus placeholder="Search tools... CTRL+K" class="w-full p-2 rounded-lg text-white bg-gray-800" />
        <nav class="mt-2 w-full">
          <div v-if="matchingTools.length === 0" class="text-center text-red-500">Your query did not match any results! :(</div>
          <div v-for="tool in matchingTools" :key="tool.path">
            <RouterLink :to="tool.path" class="block w-full mb-2 bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition-colors" @click="showMenu = false">{{ tool.name }}</RouterLink>
          </div>
          <hr class="my-4" />
          <div v-for="tool in noMatch" :key="tool.path">
            <RouterLink :to="tool.path" class="block w-full mb-2 bg-gray-800 text-gray-500 rounded-lg p-2 hover:bg-gray-600 transition-colors" @click="showMenu = false">{{ tool.name }}</RouterLink>
          </div>
        </nav>
        <h1 class="font-bold mb-2">Made by Hydrovolter</h1>
      </div>
    </header>
    <div class="flex-grow flex flex-col overflow-hidden">
      <div v-if="!showMenu" class="flex-grow p-2 m-4 md:ml-0 bg-gray-900 rounded-lg overflow-auto hide-scrollbar">
        <!--<RouterView class="overflow-auto hide-scrollbar" />-->
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" :key="$route.path"></component>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slide-enter-active, .slide-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>