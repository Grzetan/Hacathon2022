<template>
  <NavBar/>
  <WorkLifeButton/>
   
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import NavBar from './Components/NavBar.vue'
  import WorkLifeButton from './Components/WorkLifeButton.vue';

  export default defineComponent({
    name: 'MainPage',
    components: {
      NavBar,
      WorkLifeButton
    }
  });
  </script>
  
  <style scoped>
    *{
      padding: 5%;
      
    }
  </style>