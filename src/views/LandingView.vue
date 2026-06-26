<template>
    <!-- HEADER -->
    <div class="lp-header">
        <div class="lp-logo">
            <div class="lp-logo-ball">
                <img src="../assets/logo.svg" width="18" height="18" />
            </div>
            <span>PollaApp</span>
        </div>
        <NSpace>
            <NButton @click="goLogin">Iniciar sesión</NButton>
            <NButton type="primary" @click="goRegister">Crear cuenta</NButton>
        </NSpace>
    </div>

    <!-- HERO -->
    <div class="lp-section lp-hero-section">
        <NGrid :cols="2" :x-gap="48" responsive="screen" :col-gap="32" style="max-width: 900px;">
            <NGi>
                <p class="eyebrow">
                    <NIcon :component="TrophyIcon" size="12" style="vertical-align: -1px; margin-right: 4px" />
                    Temporada 2025–26 activa
                </p>
                <h1 class="hero-title">
                    Vive el fútbol con <span class="highlight">tus amigos</span> de otra forma
                </h1>
                <p class="hero-sub">
                    Crea tu grupo, pronostica resultados partido a partido y sube al podio.
                    Desde la Champions hasta el Mundial — tú eliges el torneo.
                </p>
                <NSpace>
                    <NButton type="primary" size="large" @click="goRegister">
                        Crear cuenta gratis
                    </NButton>
                    <NButton size="large" style="background-color: #fff;">Ver demo</NButton>
                </NSpace>
            </NGi>
            <NGi>
                <div class="hero-mockup">
                    <!-- Partido -->
                    <div class="mock-card">
                        <p class="mock-label">
                            <NIcon :component="StarIcon" size="10" style="vertical-align: -1px; margin-right: 3px" />
                            Fifa world · Fase de grupos
                        </p>
                        <div class="mock-teams">
                            <div class="mock-team">
                                <div class="mock-flag" style="background: #003087" />
                                <span class="mock-tname">Colombia</span>
                            </div>
                            <div class="mock-score-block">
                                <span class="mock-score">2 – 1</span>
                                <NBadge color="#1a7a3c" value="75'" />
                            </div>
                            <div class="mock-team">
                                <div class="mock-flag" style="background: #c8102e" />
                                <span class="mock-tname">Portugal</span>
                            </div>
                        </div>
                    </div>
                    <!-- Pronóstico -->
                    <div class="mock-card">
                        <p class="mock-label">Tu pronóstico</p>
                        <NSpace>
                            <NButton size="small" type="primary">Colombia</NButton>
                            <NButton size="small">Empate</NButton>
                            <NButton size="small">Portugal</NButton>
                        </NSpace>
                    </div>
                    <!-- Leaderboard -->
                    <div class="mock-card">
                        <p class="mock-label">Tu grupo · Ranking</p>
                        <div v-for="(row, i) in leaderboard" :key="i" class="lb-row">
                            <NIcon v-if="i === 0" :component="CrownIcon" size="14" color="#f5c518" />
                            <span v-else class="lb-pos">{{ i + 1 }}</span>
                            <span class="lb-name">{{ row.name }}</span>
                            <span class="lb-pts">{{ row.pts }} pts</span>
                        </div>
                    </div>
                </div>
            </NGi>
        </NGrid>
    </div>

    <NDivider />

    <!-- STATS -->
    <div class="lp-section">
        <NGrid :cols="3" :x-gap="12">
            <NGi v-for="stat in stats" :key="stat.label">
                <div class="stat-card">
                    <p class="stat-num">{{ stat.value }}<span class="highlight">{{ stat.suffix }}</span></p>
                    <p class="stat-label">{{ stat.label }}</p>
                </div>
            </NGi>
        </NGrid>
    </div>

    <NDivider />

    <!-- CARRUSEL DE FEATURES -->
    <div class="lp-section">
        <p class="eyebrow">¿Qué puedes hacer?</p>
        <h2 class="section-title">Todo en un solo lugar</h2>
        <p class="section-sub">
            Desde crear tu propio torneo privado hasta competir en pollas mundiales —
            PollaApp lo tiene todo.
        </p>
        <div class="carousel-track">
            <div v-for="feat in features" :key="feat.title" class="feature-card">
                <div class="feat-icon">
                    <NIcon :component="feat.icon" size="20" color="#1a7a3c" />
                </div>
                <p class="feat-title">{{ feat.title }}</p>
                <p class="feat-desc">{{ feat.desc }}</p>
                <NTag size="small" :bordered="false" style="margin-top: 10px; background: #1a7a3c1a; color: #1a7a3c">
                    {{ feat.tag }}
                </NTag>
            </div>
        </div>
    </div>

    <NDivider />

    <!-- DESCARGA -->
    <div class="lp-section">
        <p class="eyebrow">Disponible ahora</p>
        <h2 class="section-title">Llévalo en el bolsillo</h2>
        <p class="section-sub">
            Descarga la app y pronostica desde donde estés, aunque el partido ya haya empezado.
        </p>
        <NGrid :cols="2" :x-gap="14">
            <NGi v-for="app in apps" :key="app.label">
                <NCard class="app-card" hoverable>
                    <NSpace align="center">
                        <div class="app-icon" :style="{ background: app.color }">
                            <NImage :src="app.icon" size="24" color="#fff" />
                        </div>
                        <div>
                            <p class="app-name">{{ app.label }}</p>
                            <p class="app-req">{{ app.req }}</p>
                        </div>
                        <div style="margin-left: auto">
                            <NButton text type="primary" size="small">
                                <template #icon>
                                    <NIcon :component="DownloadIcon" />
                                </template>
                                Descargar
                            </NButton>
                        </div>
                    </NSpace>
                </NCard>
            </NGi>
        </NGrid>
    </div>

    <NDivider />

    <!-- CTA FINAL -->
    <div class="lp-section lp-cta">
        <h2 class="section-title">¿Listo para la polla?</h2>
        <p class="section-sub">
            Regístrate gratis, crea tu grupo en menos de un minuto e invita a tus amigos.
            El primer torneo corre por nuestra cuenta.
        </p>
        <NSpace justify="center">
            <NButton type="primary" size="large" @click="$emit('open-register')">
                Empezar ahora
            </NButton>
            <NButton size="large" @click="$emit('open-login')">
                Iniciar sesión
            </NButton>
        </NSpace>
    </div>

    <!-- FOOTER -->
    <div class="lp-footer">
        <span class="footer-copy">© 2026 PollaApp · Hecho para futboleros</span>
        <NSpace>
            <NButton text size="small">Privacidad</NButton>
            <NButton text size="small">Términos</NButton>
            <NButton text size="small">Contacto</NButton>
        </NSpace>
    </div>
</template>

<script setup lang="ts">
import {
    NButton, NGrid, NGi, NSpace, NIcon, NDivider,
    NCard, NTag, NBadge,
    NImage,
} from 'naive-ui'

import {
    Trophy, Star, Crown, Download,
    Users, Network, Globe, ChartBar, Bell,
} from '@lucide/vue'
import { useRouter } from 'vue-router';
defineEmits<{
    'open-login': []
    'open-register': []
}>()

// Aliases para el template (NIcon requiere componentes, no strings)
const TrophyIcon = Trophy
const StarIcon = Star
const CrownIcon = Crown
const DownloadIcon = Download
const router = useRouter()
const leaderboard = [
    { name: 'Carlos M.', pts: 47 },
    { name: 'Tú', pts: 42 },
    { name: 'Sofía R.', pts: 39 },
]

const stats = [
    { value: '12', suffix: 'K+', label: 'usuarios activos' },
    { value: '8', suffix: '+', label: 'torneos disponibles' },
    { value: '340', suffix: 'K', label: 'pronósticos enviados' },
]

const features = [
    {
        icon: Users,
        title: 'Grupos privados',
        desc: 'Invita a tus amigos con un código único. Solo ellos ven tus pronósticos y el ranking.',
        tag: 'Privado',
    },
    {
        icon: Network,
        title: 'Crea tu torneo',
        desc: 'Arma tu competición con las reglas que quieras: resultado exacto, ganador o diferencia.',
        tag: 'Personalizado',
    },
    {
        icon: Globe,
        title: 'Mundial 2026',
        desc: 'Todos los partidos cargados automáticamente. 48 selecciones, grupos y eliminatorias.',
        tag: '🏆 Mundial',
    },
    {
        icon: Star,
        title: 'Champions League',
        desc: 'Desde la fase de grupos hasta la gran final. Cada partido suma en tu ranking.',
        tag: 'UEFA',
    },
    {
        icon: ChartBar,
        title: 'Estadísticas en vivo',
        desc: 'Resultados actualizados en tiempo real. Mira cómo cambia tu posición con cada gol.',
        tag: 'Tiempo real',
    },
    {
        icon: Bell,
        title: 'Notificaciones',
        desc: 'Recibe avisos antes de que cierren los pronósticos para nunca perderte un partido.',
        tag: 'Push',
    },
]

const apps = [
    { label: 'Android', req: 'Requiere Android 8.0+', icon: '../assets/android.svg', color: '#3ddc84' },
    { label: 'iOS', req: 'Requiere iOS 15+', icon: '../assets/ios.svg', color: '#1d1d1f' },
]

const goLogin = () => {
    router.push('/login')
}

const goRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
/* ---- Layout base ---- */
.lp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    height: 60px;
    border-bottom: 1px solid var(--n-divider-color, #efeff5);
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--n-color, #fff);
}

.lp-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 18px;
}

.lp-logo-ball {
    width: 28px;
    height: 28px;
    background: #1a7a3c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lp-section {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

.lp-hero-section {
    padding-top: 4rem;
    background: url('../assets/background.jpg') no-repeat center;
    background-size: cover;
    display: grid;
    justify-content: center;
    align-items: center;
    max-width: 100%;

}

/* ---- Tipografía ---- */
.eyebrow {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #1a7a3c;
    margin-bottom: 12px;
}

.hero-title {
    font-size: 34px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 16px;
}

.hero-sub {
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 24px;
    opacity: .75;
}

.highlight {
    color: #1a7a3c;
}

.section-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
}

.section-sub {
    font-size: 14px;
    line-height: 1.7;
    opacity: .7;
    margin-bottom: 24px;
}

/* ---- Mockup hero ---- */
.hero-mockup {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 16px;
    padding: 18px;
    border: 1px solid var(--n-divider-color, #efeff5);
    position: relative;
    overflow: hidden;
    background: var(--n-color-modal, #f9f9f9);
}

.hero-mockup::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #1a7a3c, #f5c518);
}

.mock-card {
    background: var(--n-color-modal, #f9f9f9);
    border: 1px solid var(--n-divider-color, #efeff5);
    border-radius: 10px;
    padding: 12px;
}

.mock-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .06em;
    opacity: .5;
    margin-bottom: 8px;
}

.mock-teams {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.mock-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.mock-flag {
    width: 28px;
    height: 20px;
    border-radius: 3px;
}

.mock-tname {
    font-size: 11px;
    font-weight: 600;
}

.mock-score-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.mock-score {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 2px;
}

.lb-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 0;
    font-size: 13px;
}

.lb-pos {
    width: 16px;
    font-size: 11px;
    opacity: .5;
}

.lb-name {
    flex: 1;
    font-weight: 500;
}

.lb-pts {
    font-weight: 700;
    color: #1a7a3c;
}

/* ---- Stats ---- */
.stat-card {
    text-align: center;
    padding: 1.25rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--n-divider-color, #efeff5);
}

.stat-num {
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 4px;
}

.stat-label {
    font-size: 12px;
    opacity: .55;
}

/* ---- Carrusel ---- */
.carousel-track {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 12px;
    scrollbar-width: thin;
}

.feature-card {
    min-width: 210px;
    border: 1px solid var(--n-divider-color, #efeff5);
    border-radius: 14px;
    padding: 18px;
    scroll-snap-align: start;
    flex-shrink: 0;
    transition: border-color .2s;
}

.feature-card:hover {
    border-color: #1a7a3c;
}

.feat-icon {
    width: 40px;
    height: 40px;
    background: #1a7a3c1a;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
}

.feat-title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 6px;
}

.feat-desc {
    font-size: 12px;
    line-height: 1.6;
    opacity: .65;
}

/* ---- Apps ---- */
.app-card {
    border-radius: 14px !important;
}

.app-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.app-name {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 2px;
}

.app-req {
    font-size: 11px;
    opacity: .5;
}

/* ---- CTA ---- */
.lp-cta {
    text-align: center;
    max-width: 560px;
}

.lp-cta .section-sub {
    max-width: 420px;
    margin: 0 auto 24px;
}

/* ---- Footer ---- */
.lp-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 2rem;
    border-top: 1px solid var(--n-divider-color, #efeff5);
    max-width: 900px;
    margin: 0 auto;
}

.footer-copy {
    font-size: 12px;
    opacity: .45;
}
</style>