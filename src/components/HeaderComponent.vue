<template>
  <div id="Header-Container">
    <h1 class="header-title">One Piece</h1>
    <div class="search-container">
      <SearchButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchButton from './SearchButton.vue';
</script>

<style scoped>
#Header-Container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(19, 123, 101);
  padding: 10px 20px;
}

.header-title {
  margin: 0;
  color: white;
  font-size: 24px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
