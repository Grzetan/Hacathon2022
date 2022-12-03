<template>
    <header class="header">
        <button class="button">
            <img src="../../../public/assets/icon/human-icon.png" alt="Profile button">
        </button>
        <h1 class="title">
            TimeOut.
        </h1>
    </header>
</template>
   
<script lang="ts">
   import { defineComponent } from 'vue';
   
   export default defineComponent({
     name: 'NavBar',
     components: {
       
     }
   });
 
   
</script>
   
<style scoped>
    .header{
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas: 
        "icon title title none"
        ;
    }
    .button{
        width: 50px;
        height: 50px;
        grid-area: icon;
        justify-self: start;
        background-color: transparent;
        outline: none;
        
    }

    .title{
        margin: 0;
        grid-area: title; 
    }

        
</style>