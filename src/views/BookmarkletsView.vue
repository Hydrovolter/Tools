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
          },
          {
            name: 'Dark Mode 2',
            description: '(Single use) an alternative method of toggling dark mode on any website.',
            code: "javascript:document.querySelectorAll('*').forEach(e=>e.setAttribute('style','background-color:#222;background-image:none;color:#'+(/^A|BU/.test(e.tagName)?'36c;text-decoration:underline;':'eee;')+e.getAttribute('style')))"
          },
          {
            name: 'Stats.js',
            description: 'Allows you to view your FPS, RAM, and MS.',
            code: "javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()"
          },
          {
            name: 'Edit any Page',
            description: 'Allows you to edit the text of any webpage.',
            code: 'javascript:console.log(document.body.contentEditable="true"==document.body.contentEditable?"false":"true");' 
          },
          {
            name: 'X-Ray Goggles',
            description: 'Allows you to view and edit the source code of any website (like a more powerful version of "Edit any page").',
            code: "javascript:(function () {var script=document.createElement('script');script.src='https://x-ray-goggles.mouse.org/webxray.js';script.className='webxray';script.setAttribute('data-lang','en-US');script.setAttribute('data-baseuri','https://x-ray-goggles.mouse.org');document.body.appendChild(script);}())"
          },
          {
            name: 'History Flooder',
            description: 'Floods your search history with the website you are currently on.',
            code: 'javascript:var num=prompt("History flood amount:");done=false;x=window.location.href;for (var i=1; i<=num; i++){history.pushState(0, 0, i==num?x:i.toString());if(i==num){done=true}}if(done===true){alert(%22History%20flood%20successful!%20%22+window.location.href+%22%20now%20appears%20in%20your%20history%20%22+num+(num==1?%22%20time.%22:%22%20times.%20(ajaxdev)%22))}'
          },
          {
            name: 'Piano',
            description: 'Adds a piano to the bottom of the website.',
            code: 'javascript:void(document.head.appendChild(document.createElement("script")).src="https://cdn.jsdelivr.net/gh/Krazete/bookmarklets/piano.min.js")'
          },
          {
            name: 'Developer Console',
            description: 'Adds all features of the developer console to whatever page your on.', 
            code: 'javascript:(function()%7B(function() %7Bvar x %3D document.createElement("script")%3Bx.src %3D "https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FSnowLord7%2Fdevconsole%40master%2Fmain.js"%3Bx.onload %3D alert("Loaded Developer Console!")%3Bdocument.head.appendChild(x)%3B%7D)()%7D)()'
          },
          {
            name: "Minecraft Anywhere",
            description: "Explode and mine blocks on any website like Minecraft.",
            code: "javascript:(function(){window.mcbmRootURI='https://luphoria.com/MCanywhere/';window.mcbmScriptURI='mcbm.min.js';window.mcbmLang='eng';var s,ss=window.mcbmRootURI+'js/mcbm-load.min.js';s=document.createElement('script');s.src=ss;document.body.appendChild(s);})();z"
          },
          {
            name: "about:blank Embedder",
            description: "Embed any website in an about:blank iframe.",
            code: "javascript: (function () {var url = prompt('Paste the link you want to be embedded into an about:blank page.\n(INCLUDE https://)', 'https://example.com'); var urlObj = new window.URL(window.location.href); win = window.open(); win.document.body.style.margin = '0'; win.document.body.style.height = '100vh'; var iframe = win.document.createElement('iframe'); iframe.style.border = 'none'; iframe.style.width = '100%'; iframe.style.height = '100%'; iframe.style.margin = '0'; iframe.referrerpolicy = 'no-referrer'; iframe.allow = 'fullscreen'; iframe.src = url.toString(); win.document.body.appendChild(iframe); var script = win.document.createElement('script'); script.src = 'https://zatoga.pages.dev/js/main.min.js'; win.document.body.appendChild(script); })();"
          },
          {
            name: "Adblocker",
            description: "Blocks (most) ads on any website.",
            code: "javascript:(function(){    /* Ad-B-Gone: Bookmarklet that removes obnoxious ads from pages */    var selectors = [    /* By ID: */    '#sidebar-wrap', '#advert', '#xrail', '#middle-article-advert-container',    '#sponsored-recommendations', '#around-the-web', '#sponsored-recommendations',    '#taboola-content', '#taboola-below-taboola-native-thumbnails', '#inarticle_wrapper_div',    '#rc-row-container', '#ads', '#at-share-dock', '#at4-share', '#at4-follow', '#right-ads-rail',    'div#ad-interstitial', 'div#advert-article', 'div#ac-lre-player-ph',    /* By Class: */    '.ad', '.avert', '.avert__wrapper', '.middle-banner-ad', '.advertisement',    '.GoogleActiveViewClass', '.advert', '.cns-ads-stage', '.teads-inread', '.ad-banner',    '.ad-anchored', '.js_shelf_ads', '.ad-slot', '.antenna', '.xrail-content',    '.advertisement__leaderboard', '.ad-leaderboard', '.trc_rbox_outer', '.ks-recommended',    '.article-da', 'div.sponsored-stories-component', 'div.addthis-smartlayers',    'div.article-adsponsor', 'div.signin-prompt', 'div.article-bumper', 'div.video-placeholder',    'div.top-ad-container', 'div.header-ad', 'div.ad-unit', 'div.demo-block', 'div.OUTBRAIN',    'div.ob-widget', 'div.nwsrm-wrapper', 'div.announcementBar', 'div.partner-resources-block',    'div.arrow-down', 'div.m-ad', 'div.story-interrupt', 'div.taboola-recommended',    'div.ad-cluster-container', 'div.ctx-sidebar', 'div.incognito-modal', '.OUTBRAIN', '.subscribe-button',    '.ads9', '.leaderboards', '.GoogleActiveViewElement', '.mpu-container', '.ad-300x600', '.tf-ad-block',    '.sidebar-ads-holder-top', '.ads-one', '.FullPageModal__scroller',    '.content-ads-holder', '.widget-area', '.social-buttons', '.ac-player-ph',    /* Other: */    'script', 'iframe', 'video', 'aside#sponsored-recommendations', 'aside[role='banner']', 'aside',    'amp-ad', 'span[id^=ad_is_]', 'div[class*='indianapolis-optin']', 'div[id^=google_ads_iframe]',    'div[data-google-query-id]', 'section[data-response]', 'ins.adsbygoogle', 'div[data-google-query-id]',    'div[data-test-id='fullPageSignupModal']', 'div[data-test-id='giftWrap']' ];    for(let i in selectors) {        let nodesList = document.querySelectorAll(selectors[i]);        for(let i = 0; i < nodesList.length; i++) {            let el = nodesList[i];            if(el && el.parentNode)                el.parentNode.removeChild(el);        }    }})();"
          },
          {
            name: "Youtube Ad Skipper",
            description: "Skips ads on YouTube videos.",
            code: 'javascript:if(document.getElementsByClassName("video-ads")[0].innerHTML !==""){ var banner = false; for(var i = 0; i < document.getElementsByClassName("ytp-ad-overlay-close-button").length; i++){ document.getElementsByClassName("ytp-ad-overlay-close-button")[i].click(); banner = true;} if(banner === false){ document.getElementsByClassName("html5-main-video")[0].currentTime = document.getElementsByClassName("html5-main-video")[0].duration; document.getElementsByClassName("ytp-ad-skip-button")[0].click();} }void 0;'
          },
          {
            name: "Youtube Video Unblocker",
            description: "Unblocks YouTube videos that are blocked in your country/by your ISP. Works only on YouTube.",
            code: "javascript:(function () {if (window.location.toString().includes('www.youtube.com/watch?v%27)) { window.open(%27https://www.youtube-nocookie.com/embed/%27 + window.location.toString().split(%27=%27)[1]) }})()"
          },
          {
            name: "JS Calculator",
            description: "A simple calculator that can be used on any website.",
            code: "javascript:eval('function calc(){_o=prompt(_t,_z);if(_o!=\'\'&&_o!=null&&_o.toUpperCase()==_o.toLowerCase())_z=eval(_o);}');_t='JAVASCRIPTER.NET Calculator - Input the expression to be calculated:';_z='';calc();while(_o!=''&&_o!=null&&_o.toUpperCase()==_o.toLowerCase())calc()"
          },

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