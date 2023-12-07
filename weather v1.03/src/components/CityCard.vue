
<!-- This is the template for the card that displays the saved cities with their weather information -->

<template>

<!-- This is the piece of code that edits the appearance of the card on saved cities...
  It affects the looks of the card but not the arrangement of the cards -->

  <div
    class="flex
    py-6  
    px-3
    rounded-lg
    shadow-lg 
    cursor-pointer
    bg-slate-800
    bg-opacity-50
    backdrop-blur-lg 
    drop-shadow-md 
    hover:bg-black
        hover:bg-opacity-50
        hover:drop-shadow-lg
        hover:backdrop-blur-lg
    "
  >

  <!-- This is the div that contains the city and state names -->
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <!-- This is the div that contains the temperature and high/low info -->
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{ Math.round(city.weather.main.temp_max) }}&deg;
        </span>
        <span class="text-xs">
          L:
          {{ Math.round(city.weather.main.temp_min) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>
<!-- This is the script that defines the props for the city object that is passed into the component -->
<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
