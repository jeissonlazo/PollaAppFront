<template>
  <n-card :title="group.name">
    <template #header-extra>
      #header-extra
    </template>
    Card Content
    <template #footer>
      #footer
    </template>
    <template #action>
      #action
    </template>
  </n-card>
</template>
<script lang="ts" setup>
import { NCard } from 'naive-ui';
import { type Group } from '../../../interfaces/group.ts';
const props = defineProps<{
  group: Group;
}>();
</script>
<style scoped lang="css">
</style>