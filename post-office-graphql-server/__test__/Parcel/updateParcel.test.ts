import { createApolloServer } from './parcelServer'
import request from 'supertest'


const updateAParcel = {
    query: `mutation UpdateAParcel($parcelId: String, $parcel: ParcelInput) {
        updateAParcel(parcelId: $parcelId, Parcel: $parcel) {
            id
            parcel_no
            parcel_weight
          }
    }`,
    variables: {parcelId: "637fbb4aa10e8bed1c2d11ae", parcel: {parcel_weight: 12}}
}

describe('demo - using external server with Mock DB', () => {
    let server: { stop: () => any }, url: any // before the tests we spin up a new Apollo Server
    beforeAll(async () => {
      ;({ server, url } = await createApolloServer({ port: 0 }))
    }) // after the tests we'll stop the server
    afterAll(async () => {
      await server?.stop()
    })

    it("Should update a parcel", async() => {
        const response = await  request(url).post("/").send(updateAParcel);
         expect(response.body.errors).toBeUndefined();
        expect(response.body.data?.updateAParcel).toEqual(
            expect.objectContaining({
                parcel_weight: 12
            })
        )
      })

})