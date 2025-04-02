<template>
  <div class="carousel-wrapper">
    <h1 class="mx-5 text-3xl">One Piece Characters, Fruits and Crews</h1>
    <div class="container">
      <carouselComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import carouselComponent from '@/components/carouselComponent.vue';
</script>

<style>
.container {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
