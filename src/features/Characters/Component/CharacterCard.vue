<template>
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
        <p class="m-0">{{ character.age }}</p>
        <p class="m-0">{{ character.bounty || "Sin recompensa" }}</p>
        <p class="m-0">{{ character.fruit?.name || "Sin fruta" }}</p>
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
import Card from "primevue/card";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { onePieceService } from "../../../api/characters";
import { GiphyService } from "@/api/gifs";
import type { Character } from "../Interface/CharaterInterface";
//import type { Gifs } from "../../Gifs/Interfaces/IGifs";

const characters = ref<Character[]>([]);
// Usamos un objeto para almacenar los GIFs por id
const gifs = ref<Record<number, string>>({});

onMounted(async () => {
  try {
    characters.value = await onePieceService.GetCharacters();
    await loadGifs(); // Cargamos los GIFs para los personajes
  } catch (error) {
    console.error("Error obteniendo los personajes:", error);
  }
});

// Función para cargar los GIFs usando el nombre del personaje
async function loadGifs() {
  for (const character of characters.value) {
    const gifUrl = await GiphyService.getGif(character.name);
    if (gifUrl) {
      gifs.value[character.id] = gifUrl; // Almacenamos el GIF en el objeto, indexado por id
    }
  }
}

const showDetails = (id: number) => {
  console.log("Detalles:", id);
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-content: center;
}

.gif-container {
  width: 100%;
  height: 192px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}

/* Glassmorphism card effect */
.card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Transición suave */
  perspective: 1000px;
  /* Perspectiva para el efecto 3D */
  transform-style: preserve-3d;
  /* Mantiene la perspectiva 3D */
  position: relative;
  /* Necesario para el pseudo-elemento de brillo */
  overflow: hidden;
  /* Oculta el exceso del pseudo-elemento */
}

/* Efecto de brillo en los bordes */
.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
  /* Brillo blanco */
  opacity: 0;
  /* Inicialmente invisible */
  transition: opacity 0.3s ease;
  /* Transición suave */
  pointer-events: none;
  /* Evita que interfiera con los clics */
}

/* Efecto 3D personalizado al hacer hover */
.card:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(1.02);
  /* Rotación en X e Y */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  /* Sombra más pronunciada */
}

/* Mostrar el brillo al hacer hover */
.card:hover::before {
  opacity: 1;
  /* Hace visible el brillo */
}

/* Estilo para el contenido de la card */
.card-content {
  transform: translateZ(20px);
  /* Aumenta la profundidad del contenido */
}

/* Estilo para el botón */
.button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  /* Cambio de color al hover */
  transform: translateY(-2px);
  /* Efecto de elevación */
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
