<template>
  <div class="rounded-b-xl" id="Header-Container">
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
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 12vh;
  background-color: rgb(19, 123, 101);
  padding: 10px 20px;
  margin-bottom: 20vh;
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

@media only screen and (max-width: 639px) {
  #Header-Container {
    height: 10vh;
    margin-bottom: 20px;

  }

  /* Ajustes para tablets (2 columnas) */
  @media only screen and (min-width: 640px) and (max-width: 767px) {
    #Header-Container {
      height: 10vh;
      margin-bottom: 20px;

    }
  }

  /* Ajustes para pantallas medianas (3 columnas) */
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    #Header-Container {
      height: 10vh;
      margin-bottom: 20px;
    }
  }

  /* Ajustes para pantallas grandes (3 columnas) */
  @media only screen and (min-width: 1024px) {
    #Header-Container {
      height: 10vh;
      margin-bottom: 20px;

    }
  }
}
</style>
