<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  NModalProvider 
} from 'naive-ui'
</script>

<template>
  <NConfigProvider>
    <n-modal-provider>
      <NMessageProvider>
        <RouterView />
      </NMessageProvider>
    </n-modal-provider>
  </NConfigProvider>
</template>
