<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: ''
})

onMounted(() => {
  console.error('Setting onMounted')
})

</script>

<template>
  <div>Setting</div>
</template>

<style scoped>
</style>