<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  NModal,
  NCard,
  NInputOtp,
  NButton,
  NText,
  useMessage
} from 'naive-ui'

const props = defineProps<{
  show: boolean,
  urlCode: string | undefined
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  'join': [code: string]
}>()

const message = useMessage()

const code = ref<string[]>([])
const showDialog = computed({
  get: () => props.show,
  set: value => emit('update:show', value)
})

function handleJoin() {

  const referralCode = code.value.join('')

  if (referralCode.length < 8) {
    message.warning('Ingresa el código completo')
    return
  }
  emit('join', referralCode)

  resetCode()
  showDialog.value = false
}

onMounted(() => {
  if (props.urlCode) {
    code.value = props.urlCode.split('')
    showDialog.value = true
  } else {
    code.value = []
  }
})

function resetCode() {
  code.value = []
}

</script>

<template>

  <NModal v-model:show="showDialog" :mask-closable="false">

    <NCard title="Unirse a un Grupo" style="width: 450px" :bordered="false">

      <div class="content">

        <NText depth="3">
          Ingresa el código de invitación del grupo.
        </NText>

        <NInputOtp v-model:value="code" :length="8" />

      </div>

      <div class="footer">

        <NButton @click="showDialog = false">
          Cancelar
        </NButton>

        <NButton type="primary" @click="handleJoin">
          Unirse
        </NButton>

      </div>

    </NCard>

  </NModal>

</template>

<style scoped>
.content {

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  margin: 24px 0;
}

.footer {

  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>