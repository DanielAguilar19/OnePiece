<template>
  <div>
    <!-- Modal Component -->
    <CharacterModal v-if="selectedCharacter" :character="selectedCharacter"
      :gifUrl="selectedCharacter ? gifs[selectedCharacter.id] : null" :visible="modalVisible"
      @close="modalVisible = false" />

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
      <Card class="card" v-for="character in characters" :key="character.id" style="width: 25rem; overflow: hidden">
        <template #header>
          <div v-if="!gifs[character.id]" class="skeleton-image"></div>
          <div v-else :style="{ backgroundImage: `url(${gifs[character.id]})` }" class="gif-container"></div>
        </template>
        <template #title>{{ character.name }}</template>
        <template #subtitle>{{ character.job || "Sin chamba" }}</template>
        <template #content>
          <p class="m-0">{{ character.crew?.name || "Sin Descripción Disponible." }}</p>
          <p class="m-0">{{ character.age }} años</p>
          <p class="m-0">฿{{ character.bounty?.toLocaleString() || "Sin recompensa" }}</p>
          <p class="m-0">{{ character.fruit?.name || "Sin fruta" }}</p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button label="Details" severity="secondary" outlined class="w-full" @click="openModal(character,)" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import { storeToRefs } from 'pinia';

import { GiphyService } from "@/api/gifs";
import { PersonajePorNombre } from "@/api/characters";
import type { Character } from "../../Characters/Interface/CharaterInterface";
import { useSearchStore } from '@/stores/searchStore';
import CharacterModal from "@/components/modalComponent.vue";

const searchStore = useSearchStore();
const { searchQuery, isSearching } = storeToRefs(searchStore);

const characters = ref<Character[]>([]);
const gifs = ref<Record<number, string>>({});
const modalVisible = ref(false);
const selectedCharacter = ref<Character | null>(null);

onMounted(async () => {
  try {
    characters.value = await PersonajePorNombre.GetCharacterByName(searchQuery.value);
    await loadGifs();
  } catch (error) {
    console.error("Error obteniendo los personajes:", error);
  }
});

watchEffect(async () => {
  if (isSearching.value) return;
  try {
    characters.value = await PersonajePorNombre.GetCharacterByName(searchQuery.value);
    await loadGifs();
  } catch (error) {
    console.error("Error en la búsqueda:", error);
  }
});

async function loadGifs() {
  for (const character of characters.value) {
    const gifUrl = await GiphyService.getGif(character.name);
    if (gifUrl) gifs.value[character.id] = gifUrl;
  }
}

function openModal(character: Character) {
  selectedCharacter.value = character;
  modalVisible.value = true;
}
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

.p-dialog-close-button {
  display: none;
}

.card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover {
  transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.card:hover::before {
  opacity: 1;
}

/* Media queries se mantienen igual */
@media only screen and (max-width: 639px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .card {
    width: 100%;
  }

  .gif-container {
    height: 12rem;
  }
}

@media only screen and (min-width: 640px) and (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    width: 100%;
  }

  .gif-container {
    height: 16rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .card {
    width: 25rem;
  }

  .gif-container {
    height: 192px;
  }
}

@media only screen and (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .card {
    width: 25rem;
  }

  .gif-container {
    height: 192px;
  }
}
</style>
