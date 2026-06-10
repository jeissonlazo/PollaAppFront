<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    NModal,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NInputNumber,
    NSelect,
    NButton,
    type FormRules,
    useMessage
} from 'naive-ui'
import { useAuthStore } from '../stores/authStore'
import { useGroupStore } from '../stores/groupStore'
import { Copy, Link  } from '@lucide/vue';
const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    'update:show': [value: boolean]
}>()

const groupStore = useGroupStore()
const message = useMessage()
const userStore = useAuthStore()
const formRef = ref()

const form = ref({
    name: '',
    users_limit: 10,
    tournament_id: '',
    description: '',
    observations: ''
})

const tournamentOptions = [
    {
        label: 'Mundial FIFA 2026',
        value: '1',
    }
]

const rules: FormRules = {
    name: [
        {
            required: true,
            message: 'El nombre del grupo es obligatorio',
            trigger: 'blur'
        }
    ],

    users_limit: [
        {
            required: true,
            type: 'number',
            message: 'Debe indicar el límite de usuarios',
            trigger: 'change'
        }
    ],

    tournament_id: [
        {
            required: true,
            message: 'Seleccione un torneo',
            trigger: 'change'
        }
    ]
}

const showDialog = computed({
    get: () => props.show,
    set: value => emit('update:show', value)
})

const showCode = ref(false)
const groupCode = ref('')
const handleCreateGroup = async () => {

    try {

        await formRef.value?.validate()
        let code = await groupStore.createGroup({ ...form.value, admin_id: userStore.user?.id || '' })
        groupCode.value = code.invite_code || ''
        message.success('Grupo creado correctamente')

        showCode.value = true

    } catch (error) {

        message.error('No fue posible crear el grupo')

    }
}

async function copyReferralCode(code: string) {
    try {
        let appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'
        await navigator.clipboard.writeText(`${appUrl}/dashboard/home/${code}`)
        message.success('Código copiado al portapapeles')
    } catch (error) {
        message.error('No fue posible copiar el código')
    }
}

const handleCancel = () => {
    showDialog.value = false
}
</script>

<template>
    <NModal v-model:show="showDialog">
        <NCard title="Crear Grupo" style="width: 600px;" :bordered="false">
            <NForm ref="formRef" :model="form" :rules="rules" v-if="!showCode">

                <NFormItem label="Nombre" path="name">
                    <NInput v-model:value="form.name" placeholder="Nombre del grupo" />
                </NFormItem>

                <NFormItem label="Límite de usuarios" path="users_limit">
                    <NInputNumber v-model:value="form.users_limit" :min="2" :max="100" style="width: 100%;" />
                </NFormItem>

                <NFormItem label="Torneo" path="tournament">
                    <n-select v-model:value="form.tournament_id" :options="tournamentOptions"
                        placeholder="Seleccione un torneo" />
                </NFormItem>

                <NFormItem label="Descripción">
                    <NInput v-model:value="form.description" type="textarea" />
                </NFormItem>

                <NFormItem label="Observaciones">
                    <NInput v-model:value="form.observations" type="textarea" />
                </NFormItem>

                <div class="footer">

                    <NButton @click="handleCancel">
                        Cancelar
                    </NButton>

                    <NButton type="primary" :loading="groupStore.loading" @click="handleCreateGroup">
                        Crear Grupo
                    </NButton>

                </div>

            </NForm>

            <div v-if="showCode" style="margin-top: 24px;">
                <p>Grupo creado con éxito. Comparte el siguiente código para que otros puedan unirse:</p>
                <div class="code-container" style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
                    <n-h1 style="font-weight: bold;">{{ groupCode }}</n-h1>
                    
                    

                    <n-popover trigger="hover">
                        <template #trigger>
                            <n-button strong secondary circle style="margin-bottom: 20px;" @click="copyReferralCode(groupCode)">
                                <template #icon>
                                    <n-icon><Copy /></n-icon>
                                </template>
                            </n-button>
                        </template>
                        <span>Copia el codigo del grupo</span>
                    </n-popover>
                    <n-popover trigger="hover">
                        <template #trigger>
                        <n-button strong secondary circle style="margin-bottom: 20px;" @click="copyReferralCode(groupCode)">
                            <template #icon>
                                <n-icon><Link /></n-icon>
                            </template>
                        </n-button>
                        </template>
                        <span>Copia el url del grupo</span>
                    </n-popover>
                </div>
            </div>
            <template v-if="showCode" #action >
                <div class="footer">
                    <NButton @click="handleCancel">
                        Cerrar
                    </NButton>
                    <NButton type="primary" @click="copyReferralCode(groupCode)">
                        Copiar código
                    </NButton>
                </div>
            </template>
        </NCard>
    </NModal>
</template>

<style scoped>
.footer {
    margin-top: 24px;

    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
.code-container {
    padding: 12px 16px;
    border-radius: 8px;
    max-width: 250px;
    margin: 0 auto;
}
</style>