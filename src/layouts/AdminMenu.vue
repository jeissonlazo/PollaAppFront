<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import {
  NDropdown,
  NButton,
  NIcon
} from 'naive-ui'

import { Shield, Trophy, Users, CalendarDays, Flag } from '@lucide/vue';

const router = useRouter()

const options = [
  {
    label: 'Administrar Partidos',
    key: 'matches',
    icon: () =>
      h(NIcon, null, {
        default: () => h(CalendarDays)
      })
  },
  {
    label: 'Administrar Torneos',
    key: 'tournaments',
    icon: () =>
      h(NIcon, null, {
        default: () => h(Trophy)
      })
  },
  {
    label: 'Administrar Equipos',
    key: 'teams',
    icon: () =>
      h(NIcon, null, {
        default: () => h(Flag)
      })
  },
  {
    label: 'Administrar Usuarios',
    key: 'users',
    icon: () =>
      h(NIcon, null, {
        default: () => h(Users)
      })
  }
]

function handleSelect(key: string) {

  switch (key) {
    case 'matches':
      router.push('/dashboard/admin/matches')
      break

    case 'tournaments':
      router.push('/dashboard/admin/tournaments')
      break

    case 'teams':
      router.push('/dashboard/admin/teams')
      break

    case 'users':
      router.push('/dashboard/admin/users')
      break
  }
}
</script>

<template>

  <NDropdown trigger="click" :options="options" @select="handleSelect">
    <NButton secondary>

      <template #icon>
        <NIcon>
          <Shield />
        </NIcon>
      </template>

      Administración

    </NButton>
  </NDropdown>

</template>