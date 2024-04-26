import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {dataset1, dataset2} from './datasets'
import {SETTINGS} from '../src/settings'
import { CreateInputVideoType, UpdateInputVideoType, Resolutions } from '../src/input-output-types/video-types'

describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it('+ DELETE all data in db', async () => {
        await req.delete('/testing/all-data').expect(204)
    })
    it('+ GET empty array', async () => {
        setDB()

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)


        expect(res.body.length).toBe(0)
    })
    it('+ GET not empty array', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)


        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })
    it('+ GET video with correct ID', async () => {
        setDB(dataset1)

        const videoId = dataset1.videos[0].id

        const res = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .expect(200)


        expect(res.body).toEqual(dataset1.videos[0])
    })
    it('- GET video with incorrect ID', async () => {
            setDB(dataset1)
        
            const res = await req
                .get(SETTINGS.PATH.VIDEOS + '/1')
                .expect(404)
    })
    it('+ POST video with correct data', async () => {
        setDB()
        const newVideo: CreateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144]
        }
    
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo) 
            .expect(201)
    
        expect(res.body.title).toEqual(newVideo.title)
        expect(res.body.author).toEqual(newVideo.author)
        expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
    })
    it('- POST video with incorrect title length', async () => {
        setDB()
        const newVideo: CreateInputVideoType = {
            title: 'ttttttttttttttttttttttttttttttt11111111111111111111111111111',
            author: 'a1',
            availableResolutions: [Resolutions.P144]
        }
    
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo) 
            .expect(400)
    
        expect(res.body.errorsMessages[0].field).toEqual('title')
    })
    it('- POST video with incorrect title type)', async () => {
        setDB()
        const newVideo: CreateInputVideoType = {
            title: 13123 as any,
            author: 'a1',
            availableResolutions: [Resolutions.P144]
        }
    
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo) 
            .expect(400)

        //console.log(res);
    
        expect(res.body.errorsMessages[0].field).toEqual('title')
    })
    it('- POST video with incorrect author type', async () => {
        setDB()
        const newVideo: CreateInputVideoType = {
            title: 't1',
            author: 123423 as any,
            availableResolutions: [Resolutions.P144]
        }
    
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo) 
            .expect(400)

        //console.log(res);
    
        expect(res.body.errorsMessages[0].field).toEqual('author')
    })
    it('- POST video with incorrect author length', async () => {
        setDB()
        const newVideo: CreateInputVideoType = {
            title: 't1',
            author: 'aaaaaaaaaaaaaaaaa1111111111111111',
            availableResolutions: [Resolutions.P144]
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(400)

        //console.log(res);

        expect(res.body.errorsMessages[0].field).toEqual('author')
    })
    it('- POST video with incorrect availableResolutions type', async () => {
        setDB()
        const newVideo: CreateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: "P144444444" as any
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(400)

        //console.log(res);

        expect(res.body.errorsMessages[0].field).toEqual('availableResolutions')
    })
    it('- POST video with incorrect availableResolutions data', async () => {
        setDB()
        const newVideo: CreateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144, "PUQYAADB" as any]
        }
    
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo) 
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('availableResolutions')
    })
    it('+ PUT video with correct input data', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(204)

        expect(dataset2.videos[0].title).toEqual(newVideo.title)
        expect(dataset2.videos[0].author).toEqual(newVideo.author)
        expect(dataset2.videos[0].availableResolutions).toEqual(newVideo.availableResolutions)
        expect(dataset2.videos[0].canBeDownloaded).toEqual(newVideo.canBeDownloaded)
        expect(dataset2.videos[0].minAgeRestriction).toEqual(newVideo.minAgeRestriction)
        expect(dataset2.videos[0].publicationDate).toEqual(newVideo.publicationDate)
    })
    it('- PUT video with incorrect ID', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/1`)
            .send(newVideo)
            .expect(404)
    })
    it('- PUT video with incorrect title type', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 1234123 as any,
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('title')
    })
    it('- PUT video with incorrect title length', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 'tttttttttttttttttttttttt11111111111111111111111',
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('title')
    })
    it('- PUT video with incorrect author type', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 1231213 as any,
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('author')
    })
    it('- PUT video with incorrect author length', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'aaaaaaaaaaaaa111111111111111',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('author')
    })
    it('- PUT video with incorrect availableResolutions type', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: "P144444132" as any,
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('availableResolutions')
    })
    it('- PUT video with incorrect availableResolutions data', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144, "P123213" as any],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('availableResolutions')
    })
    it('- PUT video with incorrect canBeDownloaded type', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: 2133131 as any,
            minAgeRestriction: 18,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('canBeDownloaded')
    })
    it('- PUT video with incorrect minAgeRestriction value (negative)', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: -12,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('minAgeRestriction')
    })
    it('- PUT video with incorrect minAgeRestriction value', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 202222,
            publicationDate: "2024-04-25T18:13:19.184Z"
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('minAgeRestriction')
    })
    it('- PUT video with incorrect publicationDate type', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const newVideo: UpdateInputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: 1234123213 as any
        }

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toEqual('publicationDate')
    })
    it('+ DELETE video with correct ID', async () => {
        setDB(dataset2)

        const videoId = dataset2.videos[0].id

        const res = await req
            .delete(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .expect(204)
    })
    it('- DELETE video with incorrect ID', async () => {
        setDB(dataset2);

        await req
            .delete(`${SETTINGS.PATH.VIDEOS}/123123`)
            .expect(404);
    });
})