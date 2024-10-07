<script setup lang="ts">
import { RouterLink } from 'vue-router';
import LogoIcon from '@/assets/images/logos/white-logo-icon.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="LogoIcon" alt="home" />
        </RouterLink>
    </div>
</template>
