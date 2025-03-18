<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card class="card" v-for="character in characters" :key="character.id" style="width: 25rem; overflow: hidden">
      <template #header>
        <div id="seccionGif"
          :style="{ backgroundImage: `url(${gifs[character.id] || 'https://via.placeholder.com/300'})` }"
          class="gif-container"></div>
      </template>
      <template #title>{{ character.name }}</template>
      <template #subtitle>{{ character.job || "Sin chamba" }}</template>
      <template #content>
        <p class="m-0">{{ character.crew?.name || "Sin Descripción Disponible." }}</p>
        <p class="m-0">{{ character.age }}</p>
        <p class="m-0">{{ character.bounty || "Sin recompensa" }}</p>
        <p class="m-0">{{ character.fruit?.name || "Sin fruta" }}</p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button label="Details" severity="secondary" outlined class="w-full" @click="showDetails(character.id)" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { onePieceService } from "../../../api/characters";
import type { Character } from "../Interface/CharaterInterface";
import type { Gifs } from "../../Gifs/Interfaces/IGifs";


const characters = ref<Character[]>([]);
const gifs = ref<Gifs[]>([]);

onMounted(async () => {
  try {
    characters.value = await onePieceService.GetCharacters();
    //await loadGifs();
  } catch (error) {
    console.error("Error obteniendo los personajes:", error);
  }
});


const showDetails = (id: number) => {
  console.log("Detalles:", id);
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-content: center;
}

.gif-container {
  width: 100%;
  height: 192px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}

/* Glassmorphism card effect */
.card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  justify-content: center;
}
</style>
