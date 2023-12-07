<template>
  <!-- Main application container -->
  <div class=" flex flex-col min-h-screen font-Roboto 
  bg-[url('/src/assets/images/Clods-3.jpg')]
        scroll-smooth  
        md:scroll-auto
        bg-fixed" >
       
  
   
    <!-- Navigation component -->
    <Header />

    <!-- Router view container -->
    <RouterView class="flex-1" v-slot="{ Component }">
      <!-- Transition component to animate route transitions -->
      <Transition name="page">
        <!-- Dynamic component rendering based on the route -->
        <component :is="Component" />
      </Transition>
    </RouterView>
    
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";


</script>

<style>
/* Transition animation for route changes */
.page-enter-active {
  transition: 800ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.47);
}

.page-enter-from {
  opacity: 0;
}


/* Transition animation for fade in/out effects */
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* Global CSS reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}

/* Main app styles */
body {
  background-color: fade(#000, 30);
  overflow: scroll;
}



</style>
