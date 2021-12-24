<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: ''
})

onMounted(() => {
  console.error('Goblet onMounted')
})

</script>

<template>
  <div>Goblet</div>
</template>

<style scoped>
</style>