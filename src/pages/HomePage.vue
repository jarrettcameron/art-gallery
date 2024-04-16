<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { artService } from '../services/ArtService.js';
import Pop from '../utils/Pop.js';


const artWork = computed(() => AppState.art)

async function getArtWork() {
  try {
    await artService.getArt()
  }
  catch (error){
    Pop.error(error);
  }
}

onMounted(() => {
  getArtWork()
})

</script>

<template>
  <div class="container">
    <section class="my-3 mt-5 row justify-content-center">
      <div class="col-12 text-center serif">
        <h3>Browse Collection</h3>
      </div>
    </section>
    <section class="row justify-content-center px-5">
      <ArtworkCard v-for="art in artWork" :key="art.id" :art="art"/>
    </section>
    <section class="row justify-content-center my-3">
      <div class="col-lg-6 col-11">
        <div class="row text-center serif align-items-center">
          <div class="col">
            <button :disabled="AppState.currentPage == 1" class="btn" @click="artService.changePage(AppState.currentPage - 1)">Previous Page</button>
          </div>
          <div class="col">
            Page {{ AppState.currentPage }} of {{ AppState.totalPages }}
          </div>
          <div class="col">
            <button :disabled="AppState.currentPage == AppState.totalPages" class="btn" @click="artService.changePage(AppState.currentPage + 1)">Next Page</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
