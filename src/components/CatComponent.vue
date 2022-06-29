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

  // return fetch("http://numbersapi.com/random/math", {
  //   method: "get",
  //   headers: {
  //     // "content-type": "image/gif",
  //     // "content-type": "application/json",
  //     // "access-control-allow-origin": "http://localhost:3000",
  //     // "Access-Control-Allow-Credentials": "true",
  //   },
  // })
  //   .then((res) => {
  //     // a non-200 response code
  //     if (!res.ok) {
  //       // create error instance with HTTP status text
  //       const error = new Error(res.statusText);
  //       error.json = res.json();
  //       throw error;
  //     }

  //     return res.json();
  //   })
  //   .then((catGif) => {
  //     console.log("aaaa")
  //     console.log(typeof catGif)
  //     console.log("test", catGif);
  //     // set the response data
  //     cat.value = catGif;
  //   })
  //   .catch((err) => {
  //     error.value = err;
  //     // In case a custom JSON error response was provided
  //     if (err.json) {
  //       return err.json.then((json) => {
  //         // set the JSON response message
  //         error.value.message = json.message;
  //       });
  //     }
  //   })
  //   .then(() => {
  //     loading.value = false;
  //   });
}

onMounted(() => {
  fetchData();
});
</script>
