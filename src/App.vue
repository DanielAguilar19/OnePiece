<template>
  <main>
    <HeaderComponent></HeaderComponent>
    <navegationComponent></navegationComponent>
    <RouterView class="content" />
  </main>

</template>

<script setup lang="ts">
import navegationComponent from '@/components/navegationComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useSearchStore } from '@/stores/searchStore';


const searchStore = useSearchStore();
const { searchQuery, isSearching } = storeToRefs(searchStore);

watchEffect(() => {
  console.log("🔎 searchQuery:", searchQuery.value || "(vacío)");
  console.log("🟢 isSearching:", isSearching.value);
});

</script>

<style>
.content {
  margin-top: 60px;
}

main {
  width: 80vw;
  margin-top: 60px;
  padding: 20px;

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
