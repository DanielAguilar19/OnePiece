<template>
  <div>
    <h1 class="mx-5 text-3xl">Lista de Personajes</h1>
    <CharacterCard v-show="!isSearching"></CharacterCard>
    <gifComponent v-if="isSearching"></gifComponent>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/stores/searchStore';

import gifComponent from '@/features/Gifs/Components/gifComponent.vue';
import CharacterCard from "@/features/Characters/Component/CharacterCard.vue";

const searchStore = useSearchStore();
const { isSearching } = storeToRefs(searchStore);

</script>

<style scoped></style>
