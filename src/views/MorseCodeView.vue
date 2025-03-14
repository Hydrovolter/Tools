<template>
    <main class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-3xl font-bold mb-4">Morse Code Converter</h1>
      <div class="flex flex-col sm:flex-row w-full h-full space-y-2 sm:space-y-0 sm:space-x-4">
        <div class="flex-1 h-screen sm:h-full">
          <label for="plaintext" class="block text-lg mb-1">Plaintext</label>
          <textarea
            id="plaintext"
            v-model="plaintext"
            @input="convert"
            class="w-full h-[calc(100%-28px)] p-2 border-0 rounded-lg bg-gray-800 resize-none"
            placeholder="Plaintext"
          ></textarea>
        </div>
        <div class="flex-1 h-1/2 sm:h-full">
          <label for="morse" class="block text-lg mb-1">Morse Code</label>
          <textarea
            id="morse"
            v-model="morse"
            @input="convertToPlaintext"
            class="w-full h-[calc(100%-28px)] p-2 border-0 rounded-lg bg-gray-800 resize-none"
            placeholder="Morse Code"
          ></textarea>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    ' ': '/' // Space separator in Morse code
  };
  
  const inverseMorseCodeMap = Object.fromEntries(Object.entries(morseCodeMap).map(([key, value]) => [value, key]));
  
  export default {
    data() {
      return {
        plaintext: "",
        morse: "",
      };
    },
    methods: {
      encodeMorse(input) {
        return input.toUpperCase().split('').map(char => morseCodeMap[char] || '').join(' ');
      },
      decodeMorse(input) {
        return input.split(' ').map(code => inverseMorseCodeMap[code] || '').join('');
      },
      convert() {
        try {
          this.morse = this.encodeMorse(this.plaintext);
        } catch (e) {
          this.morse = "Error: Invalid input";
        }
      },
      convertToPlaintext() {
        try {
          this.plaintext = this.decodeMorse(this.morse);
        } catch (e) {
          this.plaintext = "Error: Invalid input";
        }
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
  