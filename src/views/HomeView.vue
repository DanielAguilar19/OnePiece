<template>
  <HeaderComponent></HeaderComponent>
  <main>
    <h1 class="text-xl">Lista de Personajes</h1>
    <CharacterCard v-show="!isSearching"></CharacterCard>
    <gifComponent v-if="isSearching"></gifComponent>
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
