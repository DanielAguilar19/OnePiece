<template>
  <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <Card class="card" v-for="character in characters" :key="character.id" style="width: 25rem; overflow: hidden">
      <template #header>
        <div :style="{ backgroundImage: `url(${gifs[character.id] || 'https://via.placeholder.com/300'})` }"
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
          <Button label="Desde GifComponent" severity="secondary" outlined class="w-full"
            @click="showDetails(character.id)" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { PersonajePorNombre } from "../../../api/characters";
import { GiphyService } from "@/api/gifs";
import type { Character } from "../../Characters/Interface/CharaterInterface";
import { useSearchStore } from '@/stores/searchStore';
import { storeToRefs } from 'pinia';
import { watchEffect } from "vue";

const searchStore = useSearchStore();
const { searchQuery, isSearching } = storeToRefs(searchStore);

const characters = ref<Character[]>([]);
const gifs = ref<Record<number, string>>({});

onMounted(async () => {
  try {
    characters.value = await PersonajePorNombre.GetCharacterByName(searchQuery.value);
    console.log("Personajes:", characters.value);
    await loadGifs(); // Cargamos los GIFs para los personajes
  } catch (error) {
    console.error("Error obteniendo los personajes:", error);
  }
});


watchEffect(async () => {
  if (isSearching) return; // Evita llamadas innecesarias si está vacío
  console.log("🔄 Buscando GIF para:", searchQuery.value);
  await loadGifs();
});

// Función para cargar los GIFs usando el nombre del personaje
async function loadGifs() {
  gifs.value = {}; // Limpia los GIFs anteriores
  for (const character of characters.value) {
    const gifUrl = await GiphyService.getGif(character.name);
    if (gifUrl) {
      gifs.value[character.id] = gifUrl;
    }
  }
}

const showDetails = (id: number) => {
  console.log("Detalles:", id);
};
</script>

<style scoped>
.grid {
  display: grid;
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
  padding: 10px;
}
</style>
