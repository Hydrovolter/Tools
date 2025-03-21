<template>
    <main class="flex flex-col items-center justify-center h-full w-full">
      <h1 class="text-3xl font-bold mb-4">Quadratic Equation Solver</h1>
      <div class="w-full">
        <label for="a" class="block text-lg mb-1">Coefficient a</label>
        <input type="number" v-model.number="a" class="w-full p-2 border-0 rounded-lg bg-gray-800" placeholder="a" />
      </div>
      <div class="w-full mt-4">
        <label for="b" class="block text-lg mb-1">Coefficient b</label>
        <input type="number" v-model.number="b" class="w-full p-2 border-0 rounded-lg bg-gray-800" placeholder="b" />
      </div>
      <div class="w-full mt-4">
        <label for="c" class="block text-lg mb-1">Coefficient c</label>
        <input type="number" v-model.number="c" class="w-full p-2 border-0 rounded-lg bg-gray-800" placeholder="c" />
      </div>
      <button @click="solve" class="mt-4 p-2 bg-blue-600 rounded-lg">Solve</button>
      <div v-if="solution" class="mt-4 p-4 bg-gray-700 rounded-lg w-full">
        <h2 class="text-xl font-bold">Solution:</h2>
        <p>{{ solution }}</p>
        <h2 class="text-xl font-bold mt-4">Vertex:</h2>
        <p>({{ vertex.x.toFixed(2) }}, {{ vertex.y.toFixed(2) }})</p>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        a: 1,
        b: 0,
        c: 0,
        solution: "",
        vertex: { x: 0, y: 0 },
      };
    },
    methods: {
      solve() {
        if (this.a === 0) {
          this.solution = "Not a quadratic equation.";
          return;
        }
        const discriminant = this.b * this.b - 4 * this.a * this.c;
        const denominator = 2 * this.a;
        this.vertex.x = -this.b / denominator;
        this.vertex.y = (4 * this.a * this.c - this.b * this.b) / (4 * this.a);
        
        if (discriminant > 0) {
          const root1 = (-this.b + Math.sqrt(discriminant)) / denominator;
          const root2 = (-this.b - Math.sqrt(discriminant)) / denominator;
          this.solution = `Real Roots: x₁ = ${root1.toFixed(2)}, x₂ = ${root2.toFixed(2)}`;
        } else if (discriminant === 0) {
          const root = -this.b / denominator;
          this.solution = `One Real Root: x = ${root.toFixed(2)}`;
        } else {
          const realPart = (-this.b / denominator).toFixed(2);
          const imagPart = (Math.sqrt(-discriminant) / denominator).toFixed(2);
          this.solution = `Complex Roots: x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i`;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  input:focus, button:focus {
    outline: none;
  }
  </style>
  