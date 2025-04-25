<template>
  <article
    class="image"
    data-allow-mismatch="class"
    :class="{ loaded }"
    :style="{
      aspectRatio: computedAspectRatio,
    }"
    v-intersection-observer="([observer]) => loadImage(observer?.isIntersecting || false)"
  >
    <img
      ref="image-el"
      :alt="alt"
      :src="src"
      @load="imageLoaded"
      loading="lazy"
      decoding="async"
    />
  </article>
</template>

<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'

const { src, alt, aspectRatio } = defineProps<{
  src: string
  alt: string
  aspectRatio?: number
}>()
const emit = defineEmits(['loaded'])

const uri = ref(import.meta.server ? src : '')
const loaded = ref(import.meta.server)
const imageEl = useTemplateRef('image-el')

const computedAspectRatio = ref(1)
const computeAspectRatio = () => {
  computedAspectRatio.value =
    aspectRatio || // The passed aspect ratio
    (imageEl.value?.naturalWidth || 1) / (imageEl.value?.naturalHeight || 1) || // The natural image element ratio
    1 // The default square ratio
}
computeAspectRatio()

const loadImage = (isVisible: boolean) => {
  if (isVisible) {
    uri.value = src
  } else {
    uri.value = ''
  }
}
const imageLoaded = () => {
  loaded.value = true
  emit('loaded')
  computeAspectRatio()
}

watch(
  () => src,
  () => loadImage(true),
)
if (import.meta.server) {
  loadImage(true)
  imageLoaded()
}
</script>

<style scoped>
@keyframes image {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

article.image {
  overflow: hidden;
  background-color: var(--gray-z-0);
  overflow: hidden;
  position: relative;
  display: flex;
  border: var(--image-border);
  border-radius: var(--image-border-radius);
  opacity: 0;
  animation: image var(--speed) forwards;

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all var(--speed);
  }

  &:not(.loaded) {
    animation: imageLoading alternate infinite 1s;

    img {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  &.loaded {
    img {
      opacity: 1;
      transform: scale(1);
    }
  }
}

@keyframes imageLoading {
  from {
    background-color: var(--background);
  }
  to {
    background-color: var(--image-loading-background);
  }
}
</style>
