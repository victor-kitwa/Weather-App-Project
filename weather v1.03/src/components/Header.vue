<template>


<!--This page mainly focuses on the header of the pages. Y
You can style the header and it's contents on this page-->

  <header class="sticky top-0 bg-weather-primary shadow-lg z-50 mb-15">
    <!-- Navigation bar containing logo and page links -->
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      
        <div class="flex items-center gap-3">
          <!-- Logo for WeatherHQ -->
          <p class="text-4xl"> WeatherHQ  </p>
        </div>
      
           <!-- Link to the home page -->

      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          
          <p class="text-2xl">   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Back to Search Page</p>
        </div>
      </RouterLink>

       <!-- Button to save a city -->

      <div class="flex gap-3 flex-1 justify-end">
        <p class="text-2xl">    Save City</p>
       
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
        ></i>
      </div>

      
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";

// Use a reference to an array of saved cities
const savedCities = ref([]);

// Use the current route and router for navigation
const route = useRoute();
const router = useRouter();

// Function to add a city to the list of saved cities
const addCity = () => {

   // If there are already saved cities, retrieve them
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
  }

   // Create a new object representing the location to be saved
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  // Add the new location object to the list of saved cities
  savedCities.value.push(locationObj);

  // Store the updated list of saved cities in local storage
  localStorage.setItem(
    "savedCities",
    JSON.stringify(savedCities.value)
  );

  // Navigate to the city view page for the new location
  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};


</script>
