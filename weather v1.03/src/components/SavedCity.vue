<template>
<!-- Render a CityCard for each city in savedCities array -->

  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  
  <!-- Show this message if there are no saved cities -->
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in
    the field above.
  </p>
</template>

<script setup>
// Import necessary dependencies
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";
// Define a reactive reference to an empty array, which will hold the saved cities

const savedCities = ref([]);

// Fetch data for the saved cities from localStorage and OpenWeatherMap API

const getCities = async () => {
// If there are saved cities in localStorage, retrieve them
 

  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
     // Send API requests for the weather data of each saved city
    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(   
          //The next line is where you are required to put your OPen weather API key
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        )
      );
    });

     // Wait for all API requests to resolve and add the weather data to each saved city

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();

// Use vue-router to navigate to the city view when a CityCard is clicked

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
