<template>
  <div class="input-group">
    <input type="text" v-model="searchQuery" placeholder="Buscar...">
    <button @click="actualizarBusqueda" class="search-btn">🔍</button>
    <button @click="clearSearch" class="clear-btn">❌</button>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '../stores/searchStore';
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore();
const { searchQuery, isSearching } = storeToRefs(searchStore);

const actualizarBusqueda = () => {
  searchStore.actualizarBusqueda(searchQuery.value);
  console.log("Desde el store:", searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = ''; // Limpia el input
  isSearching.value = false; // Cambia el estado de búsqueda
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

input {
  flex: 1;
  padding: 6px;
  border: none;
  border-radius: 6px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus {
  background: rgba(255, 255, 255, 0.3);
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
