<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <Dialog class="dialog glassmorphism-card" v-model:visible="internalVisible" modal
        :header="character?.name || 'Character Details'" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @close="closeModal">
        <div class="character-info">
          <div v-if="!gifUrl" class="skeleton-image"></div>
          <img v-else :src="gifUrl" class="character-image" />
          <div class="details">
            <template v-if="!character">
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
            </template>
            <template v-else>
              <p><strong>Position:</strong> {{ character?.job || 'Unknown' }}</p>
              <p><strong>Crew:</strong> {{ character?.crew?.name || 'Unknown' }}</p>
              <p><strong>Age:</strong> {{ character?.age || 'Unknown' }}</p>
              <p><strong>Size:</strong> {{ character?.size || 'Unknown' }} </p>
              <p><strong>Status:</strong> {{ character?.status || 'Unknown' }} </p>
              <p><strong>Bounty:</strong> ฿{{ character?.bounty?.toLocaleString() || 'Unknown' }}</p>
              <Accordion v-if="character?.fruit" value="0">
                <AccordionPanel value="1">
                  <AccordionHeader class="accordion-title">{{ character?.fruit?.name || 'None' }}</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0">
                      {{ character?.fruit?.description || 'None' }} ," ", {{ character?.fruit?.type || 'None' }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>
              <a v-else><strong>Devil Fruit:</strong> {{ character?.fruit?.name || 'None' }}</a>
            </template>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Dialog from "primevue/dialog";
import { GiphyService } from "@/api/gifs";
import type { Character } from "../features/Characters/Interface/CharaterInterface";

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const props = defineProps({
  visible: Boolean,
  character: Object as () => Character | null,
});

const emit = defineEmits(['close']);
const internalVisible = ref(props.visible);
const gifUrl = ref<string | null>(null);
onMounted(async () => {
  if (props.character) {
    gifUrl.value = await GiphyService.getGif(props.character.name);
  }
})
watch(() => props.visible, async (newVal) => {
  internalVisible.value = newVal;
  if (newVal && props.character) {
    gifUrl.value = await GiphyService.getGif(props.character.name);
  }
});

function closeModal() {
  internalVisible.value = false;
  emit('close');
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.glassmorphism-card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  position: relative;
  z-index: 1002;
  will-change: backdrop-filter;
  transform: translateZ(0);
}

.accordion-title {
  position: relative;
  right: 2.8%;
}

.glassmorphism-card .p-dialog-content {
  background: transparent;
  color: inherit;
}

.modal-content {
  z-index: 1001;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.p-dialog {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  position: relative;
  z-index: 1002;
}

.character-info {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.character-image {
  position: relative;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.details {
  flex: 1;
}

.details p {
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
}

.skeleton-image {
  width: 200px;
  height: 200px;
  background: linear-gradient(90deg, #2d3748 25%, #4a5568 50%, #2d3748 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
  margin-right: 2rem;
}

.skeleton-line {
  height: 1.2rem;
  background: linear-gradient(90deg, #2d3748 25%, #4a5568 50%, #2d3748 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 0.8rem;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 768px) {
  .character-info {
    flex-direction: column;
  }

  .character-image {
    width: 150px;
    height: 150px;
  }
}
</style>
