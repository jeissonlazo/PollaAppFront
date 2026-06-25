<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const token = route.query.token

if (token) {
    localStorage.setItem('token', token as string)
}
</script>