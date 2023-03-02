import { createApolloServer } from "./parcelServer"
import request from 'supertest'


const deleteAParcel = {
    query: `mutation DeleteAParcel {
       deleteAParcel(parcelId: "63812ccd304aff50cc61659e") {
        error 
        message
       }
    }`
}

describe('demo - using external server with Mock DB', () => {
    let server: { stop: () => any }, url: any // before the tests we spin up a new Apollo Server
    beforeAll(async () => {
      ;({ server, url } = await createApolloServer({ port: 0 }))
    }) // after the tests we'll stop the server
    afterAll(async () => {
      await server?.stop()
    })


    test("Should delete a parcel", async() => {
        const response = await request(url).post("/").send(deleteAParcel);
        expect(response.body.data?.deleteAParcel).toEqual(
            expect.objectContaining({
                message: "Parcel Deleted"
            })
        )
    })

})