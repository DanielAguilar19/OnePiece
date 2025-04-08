<template>
  <div class="carousel-inner">
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true"
      :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" class="thumbnail-img" />
      </template>
    </Galleria>
  </div>
</template>



<script lang="ts" setup>
import Galleria from 'primevue/galleria';
import { ref, onMounted } from "vue";
import img1 from "@/assets/images/carousel/img1.jpg";
import img2 from "@/assets/images/carousel/img2.jpg";
import img3 from "@/assets/images/carousel/img3.jpg";

onMounted(() => {
  images.value = [
    {
      itemImageSrc: img1,
      thumbnailImageSrc: img1,
      alt: "Image 1",
    },
    {
      itemImageSrc: img2,
      thumbnailImageSrc: img2,
      alt: "Image 2",
    },
    {
      itemImageSrc: img3,
      thumbnailImageSrc: img3,
      alt: "Image 3",
    },
  ];
});


const images = ref();
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]);
</script>

<style scoped>
::v-deep(.p-galleria) {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 70%;
}
</style>
