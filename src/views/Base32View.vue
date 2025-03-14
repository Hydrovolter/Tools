<template>
  <main class="flex flex-col items-center justify-center h-full w-full">
    <h1 class="text-3xl font-bold mb-4">Base32 Converter</h1>
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
        <label for="base32" class="block text-lg mb-1">Base32</label>
        <textarea
          id="base32"
          v-model="base32"
          @input="convertToPlaintext"
          class="w-full h-[calc(100%-28px)] p-2 border-0 rounded-lg bg-gray-800 resize-none"
          placeholder="Base32 encoded text"
        ></textarea>
      </div>
    </div>
    <div class="w-full">
      <button :class="['text-white transition-colors py-2 px-4 rounded-lg mt-4 w-full', sepLines ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600']" @click="togsepLines">
        {{ sepLines ? 'Encode lines separately' : 'Encode normally' }}
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      plaintext: "",
      base32: "",
      sepLines: false,
    };
  },
  methods: {
    encodeBase32(input) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      let bits = "";
      let output = "";
      for (let i = 0; i < input.length; i++) {
        bits += input[i].charCodeAt(0).toString(2).padStart(8, '0');
      }
      while (bits.length % 5 !== 0) {
        bits += "0";
      }
      for (let i = 0; i < bits.length; i += 5) {
        output += alphabet[parseInt(bits.substr(i, 5), 2)];
      }
      return output;
    },
    decodeBase32(input) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      let bits = "";
      let output = "";
      for (let i = 0; i < input.length; i++) {
        let index = alphabet.indexOf(input[i].toUpperCase());
        if (index === -1) return "Error: Invalid input";
        bits += index.toString(2).padStart(5, '0');
      }
      for (let i = 0; i + 8 <= bits.length; i += 8) {
        output += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
      }
      return output;
    },
    convert() {
      try {
        if (this.sepLines) {
          const lines = this.plaintext.split("\n");
          this.base32 = lines.map((line) => this.encodeBase32(line)).join("\n");
        } else {
          this.base32 = this.encodeBase32(this.plaintext);
        }
      } catch (e) {
        this.base32 = "Error: Invalid input";
      }
    },
    convertToPlaintext() {
      try {
        if (this.sepLines) {
          const lines = this.base32.split("\n");
          this.plaintext = lines.map((line) => this.decodeBase32(line)).join("\n");
        } else {
          this.plaintext = this.decodeBase32(this.base32);
        }
      } catch (e) {
        this.plaintext = "Error: Invalid input";
      }
    },
    togsepLines() {
      this.sepLines = !this.sepLines;
      this.convert();
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
