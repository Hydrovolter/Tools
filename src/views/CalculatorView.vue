<template>
    <main class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-3xl font-bold mb-4">Calculator</h1>
      <div class="grid grid-cols-4 gap-2 w-full max-w-md">
        <input type="text" v-model="display" class="col-span-4 p-3 text-right text-lg bg-gray-800 rounded-lg" disabled />
        <button v-for="btn in buttons" :key="btn" @click="press(btn)" :class="buttonClass(btn)" class="p-4 rounded-lg text-lg font-bold">{{ btn }}</button>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        display: "",
        buttons: [
          "7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+",
          "C", "←"
        ]
      };
    },
    methods: {
      press(btn) {
        if (btn === "C") {
          this.display = "";
        } else if (btn === "←") {
          this.display = this.display.slice(0, -1);
        } else if (btn === "=") {
          this.evaluateExpression();
        } else {
          this.display += btn;
        }
      },
      evaluateExpression() {
        try {
          const result = this.safeEvaluate(this.display);
          this.display = result.toString();
        } catch {
          this.display = "Error";
        }
      },
      safeEvaluate(expression) {
        const operators = /[\+\-\*\/]/;
        const tokens = expression.split(/([\+\-\*\/])/).map(token => token.trim());
        
        if (!tokens.length || operators.test(tokens[0]) || operators.test(tokens[tokens.length - 1])) {
          throw new Error("Invalid expression");
        }
        
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
          const operator = tokens[i];
          const nextValue = parseFloat(tokens[i + 1]);
          if (isNaN(nextValue)) throw new Error("Invalid number");
          
          switch (operator) {
            case "+": result += nextValue; break;
            case "-": result -= nextValue; break;
            case "*": result *= nextValue; break;
            case "/": 
              if (nextValue === 0) throw new Error("Division by zero");
              result /= nextValue;
              break;
            default: throw new Error("Invalid operator");
          }
        }
        return result;
      },
      buttonClass(btn) {
        if (["/", "*", "-", "+", "="].includes(btn)) return "bg-blue-500 hover:bg-blue-700 text-white";
        if (btn === "C") return "bg-red-500 hover:bg-red-700 text-white";
        if (btn === "←") return "bg-yellow-500 hover:bg-yellow-700 text-white";
        return "bg-gray-600 hover:bg-gray-800 text-white";
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    transition: background-color 0.2s;
  }
  input:focus {
    outline: none;
  }
  </style>