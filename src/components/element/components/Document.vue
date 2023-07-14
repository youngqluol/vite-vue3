<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: '',
})

onMounted(() => {
  console.error('Document onMounted')
})
</script>

<template>
  <div>Document</div>
</template>

<style scoped>
</style>
