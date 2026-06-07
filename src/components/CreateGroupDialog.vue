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
    tournament: '',
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

    tournament: [
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

const handleCreateGroup = async () => {

    try {

        await formRef.value?.validate()

        await groupStore.createGroup({...form.value, admin_id: userStore.user?.id || ''})

        message.success('Grupo creado correctamente')

        showDialog.value = false

    } catch (error) {

        message.error('No fue posible crear el grupo')

    }
}

const handleCancel = () => {
    showDialog.value = false
}
</script>

<template>
    <NModal v-model:show="showDialog">
        <NCard
            title="Crear Grupo"
            style="width: 600px;"
            :bordered="false"
        >
            <NForm
                ref="formRef"
                :model="form"
                :rules="rules"
            >

                <NFormItem
                    label="Nombre"
                    path="name"
                >
                    <NInput
                        v-model:value="form.name"
                        placeholder="Nombre del grupo"
                    />
                </NFormItem>

                <NFormItem
                    label="Límite de usuarios"
                    path="users_limit"
                >
                    <NInputNumber
                        v-model:value="form.users_limit"
                        :min="2"
                        :max="100"
                        style="width: 100%;"
                    />
                </NFormItem>

                <NFormItem
                    label="Torneo"
                    path="tournament"
                >
                    <n-select v-model:value="form.tournament" :options="tournamentOptions" placeholder="Seleccione un torneo" />
                </NFormItem>

                <NFormItem label="Descripción">
                    <NInput
                        v-model:value="form.description"
                        type="textarea"
                    />
                </NFormItem>

                <NFormItem label="Observaciones">
                    <NInput
                        v-model:value="form.observations"
                        type="textarea"
                    />
                </NFormItem>

                <div class="footer">

                    <NButton @click="handleCancel">
                        Cancelar
                    </NButton>

                    <NButton
                        type="primary"
                        :loading="groupStore.loading"
                        @click="handleCreateGroup"
                    >
                        Crear Grupo
                    </NButton>

                </div>

            </NForm>
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
</style>