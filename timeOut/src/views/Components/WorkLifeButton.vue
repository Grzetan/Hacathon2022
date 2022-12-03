<template>
    <section class="WorkLifeButton">
        <section class="content">
            <button class="button active">
                Work
            </button>
            <ion-list class="button-right button">
                <ion-item>
                    <ion-select interface="popover" placeholder="Life">
                        <IonSelectOption value="family">Family</IonSelectOption>
                        <IonSelectOption value="sport">Sport</IonSelectOption>
                        <IonSelectOption value="self">Self Care</IonSelectOption>
                        <IonSelectOption value="chill">Chill</IonSelectOption>
                        <IonSelectOption value="other">Other</IonSelectOption>
                    </ion-select>
                </ion-item>
            </ion-list>
            <button class="button button-life">
                Life
            </button>
        </section>
    </section>
</template>
   
<script lang="ts">
   import { defineComponent } from 'vue';
   import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
   
   export default defineComponent({
     name: 'WorkLifeButton',
     components: 
     { IonList, IonItem, IonSelect, IonSelectOption },
   });

   //to do {dodac zmiane klasy active do przycisków zeby zmieniało tło}

</script>
   
<style scoped>
     *{
        width: 100%;
        margin: 0%;
        padding: 0%;
     }

     .WorkLifeButton{
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
     }
     
     .content{
        position: relative;
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
     }

     .button{
        width: 50%;
        height: 100%;
        border-radius: 5px 0 0 5px;
        background-color: #212121;
     }

     .button-life{
        position: absolute;
        right: 0;
        z-index: -1000;
        border-radius: 0 5px 5px 0;
        outline: none;
     }

     ion-select, ion-list, ion-item{
        opacity: 0;
     }

     .active{
        background-color: #3D3D3D;
     }
     

     
</style>