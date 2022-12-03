<template>
   <NavBar/>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import NavBar from './Components/NavBar.vue'
  
  export default defineComponent({
    name: 'MainPage',
    components: {
      NavBar
    }
  });
  </script>
  
  <style scoped>
    *{
      padding: 5%;
    }
  </style>