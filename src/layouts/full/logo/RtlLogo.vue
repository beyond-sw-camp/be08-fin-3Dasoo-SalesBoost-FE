<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RtlLogo from '@/assets/images/logos/Rtllogo.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="RtlLogo" alt="home" />
        </RouterLink>
    </div>
</template>
