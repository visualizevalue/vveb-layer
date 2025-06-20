<template>
  <component v-if="filteredItems.length || loading || showEmpty" :is="tag" :class="classes">
    <slot :data="filteredItems" :meta="meta" :loading="loading" />

    <slot name="loading" :loading="loading">
      <Loading v-if="loading" />
    </slot>

    <aside
      v-if="hasMore && autoLoad && !loading"
      ref="scrollMarker"
      v-intersection-observer="onMarkerVisible"
      :class="[scrollDirection === 'up' ? 'top' : 'bottom']"
    ></aside>
  </component>
</template>

<script setup>
import { vIntersectionObserver } from '@vueuse/components'

const props = defineProps({
  url: String,
  query: String,
  metaAccessor: {
    type: Function,
    default: (d) => d.meta,
  },
  itemsAccessor: {
    type: Function,
    default: (d) => d.data,
  },
  itemSorter: {
    type: Function,
    default: null,
  },
  itemFilter: {
    type: Function,
    default: null,
  },
  refreshKey: [Number, String],
  autoLoad: {
    type: Boolean,
    default: true,
  },
  syncInitial: {
    type: Boolean,
    default: true,
  },
  tag: {
    type: [String, Object],
    default: 'div',
  },
  classes: String,
  showEmpty: Boolean,
  credentials: {
    type: String,
    default: 'include',
  },
  headers: {
    type: Object,
    default: () => ({}),
  },
  scrollDirection: {
    type: String,
    default: 'down',
  },
})

const { metaAccessor, itemsAccessor } = props
const refreshKey = computed(() => props.refreshKey)
const url = computed(() => props.url)
const query = computed(() => props.query || '')
const page = ref(0)
const loading = ref(false)
const items = ref([])
const sortedItems = computed(() =>
  props.itemSorter ? items.value.sort(props.itemSorter) : items.value,
)
const filteredItems = computed(() =>
  props.itemFilter ? sortedItems.value.filter(props.itemFilter) : sortedItems.value,
)
const meta = ref({})

const hasMore = computed(() => page.value < meta.value?.lastPage)

const loadMore = async () => {
  loading.value = true

  try {
    page.value += 1

    let queryParams = query.value.trim()
    if (queryParams) {
      queryParams += `&page=${page.value}`
    } else {
      queryParams = `page=${page.value}`
    }

    const result = await $fetch(`${url.value}?${queryParams}`, {
      headers: props.headers,
      credentials: props.credentials,
    })

    meta.value = metaAccessor(result)
    const newItems = itemsAccessor(result)
    if (newItems?.length) {
      items.value = items.value.concat(itemsAccessor(result))
    }
  } catch (e) {
    console.log(e)
  }

  loading.value = false
}

// Reset everything if the url changes
const reset = () => {
  page.value = 0
  items.value = []

  loadMore()
}
watch([query, url, refreshKey], () => reset())

// Scroll marker autoloading
function onMarkerVisible([{ isIntersecting }]) {
  if (!isIntersecting) return
  if (!hasMore.value) return
  if (!props.autoLoad) return

  loadMore()
}

defineExpose({
  items,
})

// Load initial data
// TODO: Refacor this component to use proper hydration!
if (import.meta.server || props.syncInitial) {
  await loadMore()
} else {
  loadMore()
}
</script>

<style scoped>
div,
section {
  position: relative;
}

aside {
  position: absolute;
  width: 100%;
  height: 25vh;

  &.bottom {
    bottom: 0;
  }
  &.top {
    top: 0;
  }
}
</style>
