<template>
  <div id="app">
    <sign-up></sign-up>
  </div>
</template>

<script lang="ts">
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
export default {
  name: 'App',
  components: {
    SignUp,
    Login
  }
}
</script>