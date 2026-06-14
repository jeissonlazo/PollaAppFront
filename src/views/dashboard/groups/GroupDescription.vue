<template>
  <NCard>

    <n-h1>
      invite code
    </n-h1>
    <n-h2>
      {{ group.invite_code }}
    </n-h2>

    <n-popover trigger="hover">
      <template #trigger>
        <n-button strong secondary circle style="margin-bottom: 20px;" @click="copyReferralCode(group.invite_code ?? '')">
          <template #icon>
            <n-icon>
              <Copy />
            </n-icon>
          </template>
        </n-button>
      </template>
      <span>Copia el codigo del grupo</span>
    </n-popover>
    <n-popover trigger="hover">
      <template #trigger>
        <n-button strong secondary circle style="margin-bottom: 20px;" @click="copyReferralCode(group.invite_code ?? '')">
          <template #icon>
            <n-icon>
              <Link />
            </n-icon>
          </template>
        </n-button>
      </template>
      <span>Copia el url del grupo</span>
    </n-popover>

    <NDescriptions label-placement="left" bordered :column="1">

      <NDescriptionsItem label="Evento">
        {{
          group
            .eventName
        }}
      </NDescriptionsItem>

      <NDescriptionsItem label="Participantes">
        {{
          group
            .members
        }}
      </NDescriptionsItem>

      <NDescriptionsItem label="Límite">
        {{
          group
            .users_limit
        }}
      </NDescriptionsItem>

      <NDescriptionsItem label="Descripción">
        {{
          group
            .description ||
          'Sin descripción'
        }}
      </NDescriptionsItem>

      <NDescriptionsItem label="Observaciones">
        {{
          group
            .observations ||
          'Sin observaciones'
        }}
      </NDescriptionsItem>

    </NDescriptions>

  </NCard>
</template>

<script setup lang="ts">

import { NH2 } from "naive-ui";
import type { Group } from "../../../interfaces/group";
import { Copy, Link  } from '@lucide/vue';
import {
  useMessage
} from 'naive-ui'
const message = useMessage()

const props = defineProps<{
  group: Group
}>()

async function copyReferralCode(code: string) {
  try {
    let appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'
    await navigator.clipboard.writeText(`${appUrl}/dashboard/home/${code}`)
    message.success('Código copiado al portapapeles')
  } catch (error) {
    message.error('No fue posible copiar el código')
  }
}
</script>