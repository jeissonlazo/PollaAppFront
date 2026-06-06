import { defineStore } from 'pinia'
import { ref } from 'vue'

import { groupService } from '../services/groupService'

import type {
    Group,
    CreateGroupRequest
} from '../interfaces/group'

export const useGroupStore = defineStore(
    'groups',
    () => {

        const loading = ref(false)

        const groups = ref<Group[]>([])

        const selectedGroup = ref<Group | null>(
            null
        )

        async function loadGroups(user_id: string) {

            loading.value = true    
            try {
                groups.value = await groupService.getMyGroups(user_id)
            }
            finally {
                loading.value = false
            }
        }

        async function loadGroup(
            groupId: string
        ) {

            loading.value = true

            try {
                selectedGroup.value =
                    await groupService.getGroup(
                        groupId
                    )
            }
            finally {
                loading.value = false
            }
        }

        async function createGroup(
            payload: CreateGroupRequest
        ) {

            loading.value = true

            try {

                const group =
                    await groupService.createGroup(
                        payload
                    )

                groups.value.push(group)

                return group

            } finally {
                loading.value = false
            }
        }

        async function deleteGroup(
            groupId: string
        ) {

            loading.value = true

            try {

                await groupService.deleteGroup(
                    groupId
                )

                groups.value = groups.value.filter(
                    g => g.id !== groupId
                )

            } finally {
                loading.value = false
            }
        }

        return {
            loading,
            groups,
            selectedGroup,
            loadGroups,
            loadGroup,
            createGroup,
            deleteGroup
        }
    }
)