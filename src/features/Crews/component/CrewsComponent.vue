<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="card" v-for="crew in visibleCrews" :key="crew.id" style="width: 25rem; overflow: hidden"
        ref="crewCardRefs">
        <template #header>
          <!--<img :src="crew.filename" alt="Crew Image" class="crew-image" />-->
        </template>
        <template #title>{{ crew.name }}</template>
        <template #subtitle>{{ crew.status || "Sin Descripción Disponible" }}</template>
        <template #content>
          <p class="m-0">Members: {{ crew.number || "Sin nombre." }}</p>
          <p class="m-0">Total bounty: {{ crew.total_prime || "Sin Descripción Disponible." }}</p>
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
import { CrewService } from "@/api/crews";
import { useIntersectionObserver } from "@/utils/CharactersInterceptor";
import { translateText } from '@/utils/translate';
import type { Crew } from "@/features/Crews/Interface/CrewsInterface";

const crews = ref<Crew[]>([]);
const visibleCrews = ref<Crew[]>([]);
const crewCardRefs = ref<HTMLElement[]>([]);
const loadedCrewsIds = ref<Set<number>>(new Set());

const STORAGE_KEY = 'one-piece-crews';
const INITIAL_LOAD_COUNT = 149;

onBeforeMount(async () => {
  try {
    const storedCrews = sessionStorage.getItem(STORAGE_KEY);

    if (storedCrews) {
      crews.value = JSON.parse(storedCrews);
      console.log('Crews loaded from sessionStorage');

      visibleCrews.value = crews.value.slice(0, INITIAL_LOAD_COUNT);
      visibleCrews.value.forEach(crew => loadedCrewsIds.value.add(crew.id));

    } else {
      const response = await CrewService.GetCrews();

      if (Array.isArray(response)) {
        const translatedCrews = await Promise.all(
          response.map(async (crew) => {
            let translatedName = crew.name;
            let translatedStatus = crew.status;

            try {
              translatedName = await translateText(crew.name);
              if (crew.status) {
                translatedStatus = await translateText(crew.status);
              }
            } catch (error) {
              console.warn(`Error translating crew ID ${crew.id}:`, error);
            }

            return {
              ...crew,
              name: translatedName,
              status: translatedStatus
            };
          })
        );

        crews.value = translatedCrews;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(crews.value));
        console.log('Crews fetched and translated.');

        visibleCrews.value = crews.value.slice(0, INITIAL_LOAD_COUNT);
        visibleCrews.value.forEach(crew => loadedCrewsIds.value.add(crew.id));
      } else {
        console.error("La respuesta no es un array:", response);
        crews.value = [];
        visibleCrews.value = [];
      }
    }
  } catch (error) {
    console.error("Error cargando crews:", error);
    crews.value = [];
    visibleCrews.value = [];
  }
});

onMounted(() => {
  const loadMoreTrigger = document.createElement('div');
  loadMoreTrigger.style.width = '100%';
  loadMoreTrigger.style.height = '20px';
  document.querySelector('.grid')?.appendChild(loadMoreTrigger);

  useIntersectionObserver(
    ref(loadMoreTrigger),
    () => {
      loadMoreCrews();
    },
    { threshold: 0.1 }
  );
});

function loadMoreCrews() {
  if (visibleCrews.value.length >= crews.value.length) {
    return;
  }

  const nextBatch = crews.value
    .filter(crew => !loadedCrewsIds.value.has(crew.id))
    .slice(0, 6);

  if (nextBatch.length === 0) return;

  visibleCrews.value = [...visibleCrews.value, ...nextBatch];
  nextBatch.forEach(crew => loadedCrewsIds.value.add(crew.id));

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

.crew-image {
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

@media only screen and (max-width: 639px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .card {
    width: 100%;
  }

  .crew-image {
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

  .crew-image {
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

  .crew-image {
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

  .crew-image {
    height: 192px;
  }
}
</style>
