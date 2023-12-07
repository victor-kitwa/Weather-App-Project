<!-- This is a Vue template for rendering an asynchronous city view component. -->

<template>
  <div>

    <!-- Suspense component that handles loading state while the async component loads -->

    <Suspense>

        <!-- Default template renders the async component -->
      <template #default>
        <AppMain />
      </template>
       <!-- Fallback template renders a skeleton loading state while the async component is loading -->

      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AppMain from "../components/AppMain.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
