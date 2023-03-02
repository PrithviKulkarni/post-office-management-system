import { createApolloServer } from "./parcelServer"
import request from 'supertest'



const createAParcel = {
    query: `mutation CreateAParcel{
        createAParcel(Parcel: {
            parcel_no: 42
            parcel_weight: 5
          }) {
            id
            parcel_no
            parcel_weight
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

    it("Should create a parcel", async() => {
        const response = await request(url).post("/").send(createAParcel);
         expect(response.body.errors).toBeUndefined();
        expect(response.body.data?.createAParcel).toEqual(
            expect.objectContaining({
                parcel_no: 42,
                parcel_weight: 5
            })
        )
    
      })

})