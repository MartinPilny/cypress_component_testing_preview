<template>
  <h2>Cat</h2>
  <button data-test-id="button-fetch-cute-cat" @click="fetchData('cute')">
    Show me a cute cat!
  </button>
  <button data-test-id="button-fetch-sleepy-cat" @click="fetchData('sleepy')">
    Show me a sleepy cat!
  </button>
  <button data-test-id="button-fetch-angry-cat" @click="fetchData('angry')">
    Show me a angry cat!
  </button>
  <button data-test-id="button-fetch-random-cat" @click="fetchData()">
    Show me a random cat!
  </button>
  <br />
  <span data-test-id="span-loading" v-if="loading">loading...</span>
  <br />
  <div v-if="cat">
    <img
      data-test-id="image-cat"
      alt="Cat image"
      :src="'https://cataas.com' + cat.url"
    />
    <br />
    <span>Tags:</span>
    <ul data-test-id="list-tags">
      <li v-for="(tag, i) in cat.tags" :key="i">{{ tag }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cat = ref(null);
const loading = ref(true);
// const error = ref(null);

async function fetchData(type = "") {
  loading.value = true;
  console.log("cat", type);

  const text = type ? `/says/I'm%20${type}` : "";
  const typeURL = type ? "/" : "";

  const res = await fetch(
    `https://cataas.com/cat${typeURL}${text}?type=small&json=true`
  );

  const catObj = await res.json();
  cat.value = catObj;
  loading.value = false;
}

onMounted(() => {
  fetchData();
});
</script>
