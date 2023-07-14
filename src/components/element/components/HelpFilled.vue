<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: '',
})

onMounted(() => {
  console.error('HelpFilled onMounted')
})
</script>

<template>
  <div>HelpFilled</div>
</template>

<style scoped>
</style>
