<template>
  <HeaderComponent></HeaderComponent>
  <main>
    <h1>Lista de Personajes</h1>
    <CharacterCard></CharacterCard>
  </main>
</template>

<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import CharacterCard from "@/features/Characters/Component/CharacterCard.vue";
</script>
