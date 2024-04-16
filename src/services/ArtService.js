import { AppState } from "../AppState.js"
import { Art } from "../models/Art.js"
import { api } from "./AxiosService.js"

class ArtService {
    constructor() {

    }

    async changePage(page) {
        AppState.currentPage = page
        await this.getArt()
    }

    async getArt() {
        const response = await api.get(`/api/artworks?page=${AppState.currentPage}`)
        AppState.totalPages = response.data.pages
        AppState.art = response.data.artworks.map(x => new Art(x))
    }

    async getArtById(artId) {
        const response = await api.get(`/api/artworks/${artId}`)
        AppState.activeArt = new Art(response.data)
    }

    async admireArt() {
        const response = await api.post(`/api/artworks/${AppState.activeArt.id}/admire`)
        AppState.activeArt = new Art(response.data)
    }
}

export const artService = new ArtService()