<script setup>
import { useRoute } from 'vue-router';
import { onUnmounted, onMounted, computed } from 'vue';
import { artService } from '../services/ArtService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
    const route = useRoute()

    const activeArt = computed(() => AppState.activeArt)

    async function getArtById() {
        try {
            await artService.getArtById(route.params.artId)
        }
        catch (error){
          Pop.error(error);
        }
    }

    async function admireArt() {
        try {
          if (AppState.account == null) throw new Error('You must be logged in to perform this action.')
          await artService.admireArt()
        }
        catch (error){
          Pop.error(error);
        }
    }

    onMounted(() => {
        getArtById()
    })

    onUnmounted(() => {
        AppState.activeArt = null
    })
</script>


<template>
    <div v-if="activeArt" class="container">
        <section class="row mt-5 justify-content-center">
            <div class="col-lg-6 col-12">
                <div class="row border shadow">
                    <img class="col-12 p-0 img-fluid" :src="activeArt.imgUrls.regular" :alt="activeArt.altDesc">

                    <div class="col-12 my-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <h3 class="serif">{{ activeArt.attribution }}</h3>
                            <div class="me-3 mb-1 text-danger"><i v-if="AppState.account" @click="admireArt()" role="button" :title="activeArt.isAdmired ? 'Click to stop admiring this artwork.' : 'Click to admire this artwork.'" :class="activeArt.isAdmired ? 'mdi-heart' : 'mdi-heart-outline'" class="mdi me-1"></i><i v-else title="You must be logged in to admire artwork." class="mdi me-1 mdi-heart"></i> {{activeArt.admirers.length }}</div>
                        </div>
                        <p class="text-secondary">{{ activeArt.description }}</p>
                        <a :href="activeArt.original">View Full Image</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div v-else class="container">
        <section class="row text-center">
            <h1>Loading..</h1>
        </section>
    </div>
</template>


<style lang="scss" scoped>
    img {
        aspect-ratio: unset;
        object-fit: cover;
        max-height: 200px;
        min-height: 200px;
    }
</style>