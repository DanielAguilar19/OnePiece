<template>
  <div class="grid grid-cols-3 md:grid-cols-3 gap-4">
    <Card v-for="character in characters" :key="character.id" style="width: 25rem; overflow: hidden">
      <template #header>
        <img :alt="character.name" :src="getCharacterImage(character)" class="w-full h-48 object-cover" />
      </template>
      <template #title>{{ character.name }}</template>
      <template #subtitle>{{ character.job || "Sin chamba" }}</template>
      <template #content>
        <p class="m-0">
          {{ character.crew?.description || "Sin Descripción Disponible." }}
        </p>
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
import Card from 'primevue/card';
import { ref, onMounted } from "vue";
import { Personajes } from "../../../api/characters";
import type { Character } from "../Interface/CharaterInterface";

const characters = ref<Character[]>([]);

onMounted(async () => {
  try {
    characters.value = await Personajes.GetCharacters();
  } catch (error) {
    console.error("Error obteniendo los personajes:", error);
  }
});

const getCharacterImage = (character: Character): string => {
  return character.fruit?.filename
    ? `https://tu-api.com/images/${character.fruit.filename}`
    : "https://via.placeholder.com/300";
};

const showDetails = (id: number) => {
  console.log("Detalles:", id);
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
  justify-content: center;
}

img {
  border-radius: 8px;
}
</style>
