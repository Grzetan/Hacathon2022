<template>
  <ion-app>
    <ion-router-outlet />
    <MainPage/>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import MainPage from './views/MainPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    MainPage
  }
});
</script>