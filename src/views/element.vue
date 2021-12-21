<script setup lang="ts">
import { ref } from 'vue';
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
function handleCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <!-- <button @click="handleCollapse">展开/收起</button> -->
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <el-menu-item index="2">
      <el-icon>
        <icon-menu />
      </el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon>
        <document />
      </el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo {
  width: 200px;
}
</style>