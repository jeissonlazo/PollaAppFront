import api from './api'
import type {
    Group,
    CreateGroupRequest
} from '../interfaces/group'

export const groupService = {

    async getMyGroups(user_id: string): Promise<Group[]> {
        const response = await api.get(`groups/${user_id}/groups`)
        return response.data
    },

    async getGroup(groupId: string): Promise<Group> {
        const response = await api.get(`groups/${groupId}`)
        return response.data
    },

    async createGroup(
        payload: CreateGroupRequest
    ): Promise<Group> {
        const response = await api.post(
            '/groups',
            payload
        )

        return response.data
    },

    async deleteGroup(id: string) {
        await api.delete(`/groups/${id}`)
    },

    async joinGroup(invite_code: string, user_id: string) {
        await api.post('/groups/join', {
            invite_code,
            user_id
        })
    }
}