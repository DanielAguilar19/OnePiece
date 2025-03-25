<template>
  <div>
    <CharacterModal v-if="selectedCharacter" :character="selectedCharacter" :visible="modalVisible"
      @close="modalVisible = false" />

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="card" v-for="character in characters" :key="character.id" style="width: 25rem; overflow: hidden">
        <template #header>
          <div :style="{ backgroundImage: `url(${gifs[character.id] || 'https://via.placeholder.com/300'})` }"
            class="gif-container"></div>
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
            <Button label="Details" severity="secondary" outlined class="w-full" @click="openModal(character)" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import CharacterModal from "../../../components/modalComponent.vue";
import { onePieceService } from "../../../api/characters";
import { GiphyService } from "@/api/gifs";
import type { Character } from "../Interface/CharaterInterface";

const characters = ref<Character[]>([]);
const gifs = ref<Record<number, string>>({});
const modalVisible = ref(false);
const selectedCharacter = ref<Character | null>(null);

onMounted(async () => {
  try {
    characters.value = await onePieceService.GetCharacters();
    await loadGifs();
  } catch (error) {
    console.error("Error:", error);
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-content: center;
  margin: 8%;
}

.gif-container {
  width: 100%;
  height: 192px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
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

.card:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* Estilos base para móviles (1 columna) */
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

/* Ajustes para tablets (2 columnas) */
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

/* Ajustes para pantallas medianas (3 columnas) */
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

/* Ajustes para pantallas grandes (3 columnas) */
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
