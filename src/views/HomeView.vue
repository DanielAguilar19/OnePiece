<template>
  <HeaderComponent></HeaderComponent>
  <main>
    <h1 class="mx-5 text-3xl">Lista de Personajes</h1>
    <CharacterCard class="mt-4" v-show="!isSearching"></CharacterCard>
    <gifComponent class="mt-4" v-if="isSearching"></gifComponent>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

import gifComponent from '@/features/Gifs/Components/gifComponent.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import CharacterCard from "@/features/Characters/Component/CharacterCard.vue";

const searchStore = useSearchStore();
const { searchQuery, isSearching } = storeToRefs(searchStore);

watchEffect(() => {
  console.log("🔎 searchQuery:", searchQuery.value || "(vacío)");
  console.log("🟢 isSearching:", isSearching.value);
});
</script>

<style scoped>
main {
  margin-top: 20vh;
}

@media only screen and (max-width: 639px) {
  main {
    margin-top: 10vh;
  }

  /* Ajustes para tablets (2 columnas) */
  @media only screen and (min-width: 640px) and (max-width: 767px) {
    main {
      margin-top: 10vh;
    }
  }

  /* Ajustes para pantallas medianas (3 columnas) */
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    main {
      margin-top: 10vh;
    }
  }

  /* Ajustes para pantallas grandes (3 columnas) */
  @media only screen and (min-width: 1024px) {
    main {
      margin-top: 10vh;
    }
  }
}
</style>
