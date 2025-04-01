<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card v-show="fruta.filename" class="card" v-for="fruta in visibleFruits" :key="fruta.id"
        style="width: 25rem; overflow: hidden" ref="fruitCardRefs">
        <template #header>
          <img :src="fruta.filename" alt="Fruit Image" class="gif-container" />
        </template>
        <template #title>{{ fruta.name }}</template>
        <template #subtitle>{{ fruta.type || "Sin Descripción Disponible" }}</template>
        <template #content>
          <p class="m-0">{{ fruta.roman_name || "Sin nombre." }}</p>
          <p class="m-0">{{ fruta.description || "Sin Descripción Disponible." }}</p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import Card from "primevue/card";
import { fruitsService } from "@/api/fruits";
import { useIntersectionObserver } from "@/utils/CharactersInterceptor";
import type { Fruit } from "@/features/Fruits/Interface/fruitInterface";

const fruits = ref<Fruit[]>([]);
const visibleFruits = ref<Fruit[]>([]);
const fruitCardRefs = ref<HTMLElement[]>([]);
const loadedFruitIds = ref<Set<number>>(new Set());

// Clave para sessionStorage
const STORAGE_KEY = 'one-piece-fruits';

// Cantidad de frutas a cargar inicialmente
const INITIAL_LOAD_COUNT = 6;

onBeforeMount(async () => {
  try {
    // Primero intentamos obtener datos de sessionStorage
    const storedFruits = sessionStorage.getItem(STORAGE_KEY);

    if (storedFruits) {
      // Si hay datos en sessionStorage, los usamos
      fruits.value = JSON.parse(storedFruits);
      console.log('Fruits loaded from sessionStorage');

      // Cargamos inicialmente solo las primeras frutas
      visibleFruits.value = fruits.value.slice(0, INITIAL_LOAD_COUNT);

      // Marcamos las frutas iniciales como cargadas
      visibleFruits.value.forEach(fruit => {
        loadedFruitIds.value.add(fruit.id);
      });
    } else {
      // Si no hay datos en sessionStorage, hacemos la petición
      const response = await fruitsService.GetFrutits();
      if (Array.isArray(response)) {
        fruits.value = response;

        // Guardamos en sessionStorage
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fruits.value));
        console.log('Fruits fetched and saved to sessionStorage');

        // Cargamos inicialmente solo las primeras frutas
        visibleFruits.value = fruits.value.slice(0, INITIAL_LOAD_COUNT);

        // Marcamos las frutas iniciales como cargadas
        visibleFruits.value.forEach(fruit => {
          loadedFruitIds.value.add(fruit.id);
        });
      } else {
        console.error("La respuesta no es un array:", response);
        fruits.value = [];
        visibleFruits.value = [];
      }
    }
  } catch (error) {
    console.error("Error:", error);
    fruits.value = [];
    visibleFruits.value = [];
  }
});

// Observer para cargar más frutas cuando el usuario llega al final de la lista
onMounted(() => {
  // Creamos un elemento observador para el final de la lista
  const loadMoreTrigger = document.createElement('div');
  loadMoreTrigger.style.width = '100%';
  loadMoreTrigger.style.height = '20px';
  document.querySelector('.grid')?.appendChild(loadMoreTrigger);

  // Observamos el elemento trigger
  useIntersectionObserver(
    ref(loadMoreTrigger),
    () => {
      // Cuando el trigger es visible, cargamos más frutas
      loadMoreFruits();
    },
    { threshold: 0.1 }
  );
});

// Función para cargar más frutas cuando sea necesario
function loadMoreFruits() {
  // Si ya hemos cargado todas las frutas, no hacemos nada
  if (visibleFruits.value.length >= fruits.value.length) {
    return;
  }

  // Calcular qué frutas añadir
  const nextBatch = fruits.value
    .filter(fruit => !loadedFruitIds.value.has(fruit.id))
    .slice(0, 6); // Cargar de 6 en 6

  if (nextBatch.length === 0) return;

  // Añadir nuevas frutas a las visibles
  visibleFruits.value = [...visibleFruits.value, ...nextBatch];

  // Marcar las nuevas frutas como cargadas
  nextBatch.forEach(fruit => {
    loadedFruitIds.value.add(fruit.id);
  });

  console.log(`Loaded ${nextBatch.length} more fruits. Total: ${visibleFruits.value.length}/${fruits.value.length}`);
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-content: center;
  margin: 2%;
}

.gif-container {
  width: 50%;
  height: auto;
  border-radius: 8px;
  display: block;
  margin-left: 25%;
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
