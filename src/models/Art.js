import { AppState } from "../AppState.js"

export class Art {
    constructor(data) {
        this.id = data.id
        this.altDesc = data.altDescription || ""
        this.attribution = data.attribution
        this.color = data.color
        this.description = data.description
        this.imgUrls = data.imgUrls
        this.original = data.originalLink
        this.admirers = data.admirers
    }

    get isAdmired() {
        return this.admirers.find(x => x.id == AppState.account?.id) != null
    }
}