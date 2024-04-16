<script setup>
import { Art } from '../models/Art.js';
defineProps({art: Art})
</script>


<template>
    <router-link :to="{name: 'Art Viewer', params: { artId: art.id }}" class="col-lg-3 col-md-4 col-6 selectable text-center py-2">
        <img class="img-fluid" :src="art.imgUrls.small" alt="">
    </router-link>
</template>


<style lang="scss" scoped>
    img {
        aspect-ratio: 1/1;
        object-fit: cover;
        object-position: center;
    }
</style>