<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  test?: string
}
const props = withDefaults(defineProps<Props>(), {
  test: ''
})

onMounted(() => {
  console.error('Shop onMounted')
})

</script>

<template>
  <div>Shop</div>
</template>

<style scoped>
</style>