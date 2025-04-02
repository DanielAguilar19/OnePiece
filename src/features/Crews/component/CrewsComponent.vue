<template>
  <div>
    <div v-if="loading" class="loading-container">
      <p>Cargando tripulaciones...</p>
    </div>
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-button">Reintentar</button>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="card" v-for="crew in visibleCrews" :key="crew.id" style="width: 25rem; overflow: hidden"
        ref="crewCardRefs">
        <template #header>
          <div class="crew-header">
            <span class="crew-label">{{ crew.name }}</span>
          </div>
        </template>
        <template #title>{{ crew.name }}</template>
        <template #subtitle>{{ crew.status || "Sin Descripción Disponible" }}</template>
        <template #content>
          <p class="m-0">Members: {{ crew.number || "Sin nombre." }}</p>
          <p class="m-0">Total bounty: {{ crew.total_prime || "Sin Descripción Disponible." }}</p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <button class="detail-button">Ver Detalles</button>
          </div>
        </template>
      </Card>
    </div>
    <div v-if="!loading && !error && visibleCrews.length === 0" class="no-data">
      No hay tripulaciones disponibles.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import Card from "primevue/card";
import { CrewService } from "@/api/crews";
import { useIntersectionObserver } from "@/utils/CharactersInterceptor";
import type { Crew } from "@/features/Crews/Interface/CrewsInterface";

const crews = ref<Crew[]>([]);
const visibleCrews = ref<Crew[]>([]);
const crewCardRefs = ref<HTMLElement[]>([]);
const loadedCrewsIds = ref<Set<number>>(new Set());
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const STORAGE_KEY = 'one-piece-crews';
const INITIAL_LOAD_COUNT = 6;


onBeforeMount(async () => {
  await fetchCrews();
});

async function fetchCrews() {
  loading.value = true;
  error.value = null;

  try {
    const storedCrews = sessionStorage.getItem(STORAGE_KEY);

    if (storedCrews) {
      const parsedData = JSON.parse(storedCrews);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        crews.value = parsedData;
        console.log('Crews loaded from sessionStorage:', crews.value.length);
        initializeVisibleCrews();
        loading.value = false;
        return;
      }
    }

    console.log('Fetching crews from API...');
    const response = await CrewService.GetCrews();

    if (Array.isArray(response) && response.length > 0) {
      crews.value = response;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(crews.value));
      console.log('Crews fetched and saved:', crews.value.length);
    } else {
      console.warn("La respuesta de API no es válida, usando datos de fallback");
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(crews.value));
    }

    initializeVisibleCrews();
  } catch (err) {
    console.error("Error al cargar datos:", err);
    error.value = "Error al cargar las tripulaciones. Por favor, intenta de nuevo.";

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(crews.value));
    initializeVisibleCrews();
  } finally {
    loading.value = false;
  }
}

function initializeVisibleCrews() {
  visibleCrews.value = crews.value.slice(0, INITIAL_LOAD_COUNT);

  visibleCrews.value.forEach(crew => {
    loadedCrewsIds.value.add(crew.id);
  });
}

function retryFetch() {
  sessionStorage.removeItem(STORAGE_KEY);
  fetchCrews();
}

onMounted(() => {
  if (crews.value.length > INITIAL_LOAD_COUNT) {
    setupIntersectionObserver();
  }
});

function setupIntersectionObserver() {
  const loadMoreTrigger = document.createElement('div');
  loadMoreTrigger.style.width = '100%';
  loadMoreTrigger.style.height = '20px';
  loadMoreTrigger.id = 'load-more-trigger';

  setTimeout(() => {
    const gridElement = document.querySelector('.grid');
    if (gridElement) {
      gridElement.appendChild(loadMoreTrigger);

      useIntersectionObserver(
        ref(loadMoreTrigger),
        () => {
          loadMoreCrews();
        },
        { threshold: 0.1 }
      );
    }
  }, 500);
}

function loadMoreCrews() {
  if (visibleCrews.value.length >= crews.value.length) {
    return;
  }

  const nextBatch = crews.value
    .filter(crew => !loadedCrewsIds.value.has(crew.id))
    .slice(0, 6);

  if (nextBatch.length === 0) return;

  visibleCrews.value = [...visibleCrews.value, ...nextBatch];

  nextBatch.forEach(crew => {
    loadedCrewsIds.value.add(crew.id);
  });

  console.log(`Loaded ${nextBatch.length} more crews. Total: ${visibleCrews.value.length}/${crews.value.length}`);
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

.loading-container,
.error-container,
.no-data {
  text-align: center;
  padding: 2rem;
  margin: 2rem;
}

.retry-button,
.detail-button {
  background-color: #4682B4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.retry-button:hover,
.detail-button:hover {
  background-color: #366890;
}

.crew-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.crew-label {
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px black;
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
}

/* Ajustes para tablets (2 columnas) */
@media only screen and (min-width: 640px) and (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    width: 100%;
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
}

/* Ajustes para pantallas grandes (3 columnas) */
@media only screen and (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .card {
    width: 25rem;
  }
}
</style>
