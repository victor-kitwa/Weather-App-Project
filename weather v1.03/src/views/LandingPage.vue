<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative flex items-center mt-20 z-20">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b 
        focus:border-weather-secondary 
        focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]
        text-3xl"
      />

<!--This is the Get my location button on the landing page-->

      <button
        class="ml-2 mx-1
        
        py-2 
        px-8 
        bg-slate-800
        bg-opacity-60
        backdrop-blur-lg 
        drop-shadow-lg 
        text-white 
        rounded-lg
        hover:bg-black
        hover:bg-opacity-40
        hover:drop-shadow-lg
        hover:backdrop-blur-lg
        
        "
        @click="getLocation"
      >
        Get my location's weather
      </button>
      <ul
        class="absolute bg-slate-900 text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p
          class="py-2"
          v-if="!searchError && mapboxSearchResults.length === 0"
        >
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

  <!--This is the code that will affect the saved city cards on the Landing Page-->

    <div class="grid grid-rows-3 grid-flow-col gap-4">
      <Suspense>
        <SavedCity />
        <template #fallback>
          <CityCardDesign />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityCardDesign from "../components/CityCardDesign.vue";
import SavedCity from "../components/SavedCity.vue";

const router = useRouter();

// This function previews the selected city on the cityView page


const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

// This is the Mapbox API key
const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";

// This is the search query for the search bar

  const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError

        .value = true;
}
} else {
mapboxSearchResults.value = null;
searchError.value = null;
}
}, 500);
};

const getLocation = () => {
navigator.geolocation.getCurrentPosition(
async (position) => {
try {
  const result = await axios.get(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${mapboxAPIKey}&types=place`
);
previewCity(result.data.features[0]);
} catch {
searchError.value = true;
}
},
(error) => {
console.log(error);
searchError.value = true;
}
);
};
</script>