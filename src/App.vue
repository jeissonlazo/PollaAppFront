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
      <n-loading-bar-provider>
        <NMessageProvider>
          <RouterView />
        </NMessageProvider>
      </n-loading-bar-provider>
    </n-modal-provider>
  </NConfigProvider>
</template>
