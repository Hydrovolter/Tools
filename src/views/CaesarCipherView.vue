<template>
    <main class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-3xl font-bold mb-4">Caesar Cipher</h1>
      <div class="flex flex-col sm:flex-row w-full h-full space-y-2 sm:space-y-0 sm:space-x-4">
        <div class="flex-1 h-screen sm:h-full">
          <label for="plaintext" class="block text-lg mb-1">Plaintext</label>
          <textarea
            id="plaintext"
            v-model="plaintext"
            @input="convertCipher"
            class="w-full h-[calc(100%-28px)] p-2 border-0 rounded-lg bg-gray-800 resize-none"
            placeholder="Plaintext"
          ></textarea>
        </div>
        <div class="flex-1 h-1/2 sm:h-full">
          <label for="ciphertext" class="block text-lg mb-1">Ciphertext</label>
          <textarea
            id="ciphertext"
            v-model="ciphertext"
            @input="convertToPlaintext"
            class="w-full h-[calc(100%-28px)] p-2 border-0 rounded-lg bg-gray-800 resize-none"
            placeholder="Ciphertext"
          ></textarea>
        </div>
      </div>
      <br>
      <div class="w-full">
        <label for="shift" class="block text-lg mb-1">Shift</label>
        <input
          type="number"
          v-model="shift"
          @input="convertCipher"
          class="w-full p-2 border-0 rounded-lg bg-gray-800"
          placeholder="Shift"
        />
      </div>
      <div class="w-full mt-4">
        <label for="caseSensitive" class="flex items-center">
          <input
            type="checkbox"
            v-model="caseSensitive"
            class="mr-2"
            @change="convertCipher"
          />
          Maintain casing
        </label>
      </div>
      <div class="w-full mt-4">
        <label for="customAlphabet" class="block text-lg mb-1">Custom Alphabet</label>
        <textarea
          id="customAlphabet"
          v-model="alphabet"
          @input="convertCipher"
          class="w-full p-2 border-0 rounded-lg bg-gray-800 resize-none"
          placeholder="Custom Alphabet (e.g. abcdefghijklmnopqrstuvwxyz)"
        ></textarea>
      </div>
      <div class="w-full mt-4">
        <label for="includeForeignChars" class="flex items-center">
          <input
            type="checkbox"
            v-model="includeForeignChars"
            class="mr-2"
            @change="convertCipher"
          />
          Include foreign characters
        </label>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        plaintext: "",
        ciphertext: "",
        shift: 3,
        caseSensitive: true,
        alphabet: "abcdefghijklmnopqrstuvwxyz",
        includeForeignChars: true,
      };
    },
    methods: {
      convertCipher() {
        try {
          const shift = this.shift;
          const alphabet = this.alphabet;
          const caseSensitive = this.caseSensitive;
          const includeForeignChars = this.includeForeignChars;
  
          this.ciphertext = this.caesarCipher(this.plaintext, shift, alphabet, caseSensitive, includeForeignChars);
        } catch (e) {
          this.ciphertext = "Error: Invalid input";
        }
      },
      convertToPlaintext() {
        try {
          const shift = -this.shift;
          const alphabet = this.alphabet;
          const caseSensitive = this.caseSensitive;
          const includeForeignChars = this.includeForeignChars;
  
          this.plaintext = this.caesarCipher(this.ciphertext, shift, alphabet, caseSensitive, includeForeignChars);
        } catch (e) {
          this.plaintext = "Error: Invalid input";
        }
      },
      caesarCipher(text, shift, alphabet, caseSensitive, includeForeignChars) {
        const output = text.split('').map((char) => {
          let charCode = char.charCodeAt(0);
  
          if (!caseSensitive) {
            char = char.toLowerCase();
          }
  
          const idx = alphabet.indexOf(char.toLowerCase());
          if (idx === -1) {
            if (includeForeignChars) {
              return char; // Keep foreign characters as is
            }
            return ''; // Ignore characters outside the alphabet
          }
  
          const newIdx = (idx + shift + alphabet.length) % alphabet.length;
          const newChar = alphabet[newIdx];
  
          return caseSensitive && char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
        });
  
        return output.join('');
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
  