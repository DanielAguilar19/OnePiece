<template>
  <div class="input-group">
    <AutoComplete v-model="searchQuery" :suggestions="filteredCharacters" @complete="handleSearch"
      placeholder="Buscar..." class="custom-autocomplete" />
    <button @click="actualizarBusqueda" class="search-btn">🔍</button>
    <button @click="clearSearch" class="clear-btn">❌</button>
  </div>
</template>

<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
import { useSearchStore } from '../stores/searchStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { onePieceService } from "../api/characters";
import type { Character } from "../features/Characters/Interface/CharaterInterface";

const searchStore = useSearchStore();
const { searchQuery, isSearching } = storeToRefs(searchStore);
const characters = ref<Character[]>([]);
const filteredCharacters = ref<{ label: string }[]>([]);

onMounted(async () => {
  characters.value = await onePieceService.GetAllCharacters();
  console.log("Personajes cargados Para el Autocomplete SearchBar:", characters.value);
});

function handleSearch(event: { query: string }) {
  filteredCharacters.value = characters.value
    .filter((char) => char.name.toLowerCase().includes(event.query.toLowerCase()))
    .map((char) => ({ label: char.name }));
}

const actualizarBusqueda = () => {
  searchStore.actualizarBusqueda(searchQuery.value);
  console.log("Desde el store:", searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = '';
  isSearching.value = false;
};
</script>

<style scoped>
.input-group {
  display: flex;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 350px;
  margin: 15px auto;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

:deep(.p-autocomplete) {
  width: 100%;
}

:deep(.p-autocomplete-input) {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 6px;
  outline: none;
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  font-size: 14px;
  transition: all 0.3s ease;
}

:deep(.p-autocomplete-input::placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.p-autocomplete-input:focus) {
  background: rgba(255, 255, 255, 0.3) !important;
}

:deep(.p-autocomplete-panel) {
  background-color: rgba(0, 0, 0, 0.9) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 6px !important;
  margin-top: 5px !important;
}

:deep(.p-autocomplete-item) {
  color: white !important;
  padding: 10px !important;
}

:deep(.p-autocomplete-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

button {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn {
  background: rgba(0, 123, 255, 0.7);
  color: white;
}

.search-btn:hover {
  background: rgba(0, 123, 255, 0.9);
}

.clear-btn {
  background: rgba(220, 53, 69, 0.7);
  color: white;
}

.clear-btn:hover {
  background: rgba(220, 53, 69, 0.9);
}
</style>
