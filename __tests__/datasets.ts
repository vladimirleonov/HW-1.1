import {VideoDBType} from '../src/db/video-db-type'
import {Resolutions} from '../src/input-output-types/video-types'
import {DBType} from '../src/db/db'

export const video1: any = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
}

export const video2: VideoDBType = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P240],
}



export const dataset1: DBType = {
    videos: [video1],
}

export const dataset2: DBType = {
    videos: [video2],
}