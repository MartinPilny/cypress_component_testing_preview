<template>
  <h2>Login Form</h2>
  <form class="greetings">
    <input type="email" v-model="username" /> <br>
    <input type="password" v-model="password" /> <br>
    <button type="submit">Log in</button>
  </form>
  <!-- <span>{{ username }}</span> -->
</template>

<script setup>
import { ref } from "vue";

// reactive state
const username = ref("");
const password = ref("");
</script>
