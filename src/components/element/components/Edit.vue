<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: '',
})

onMounted(() => {
  console.error('Edit onMounted')
})
</script>

<template>
  <div>Edit</div>
</template>

<style scoped>
</style>
