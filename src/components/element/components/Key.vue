<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: '',
})

onMounted(() => {
  console.error('Key onMounted')
})
</script>

<template>
  <div>Key</div>
</template>

<style scoped>
</style>
