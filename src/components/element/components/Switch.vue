<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: '',
})

onMounted(() => {
  console.error('Switch onMounted')
})
</script>

<template>
  <div>Switch</div>
</template>

<style scoped>
</style>
