import { createApolloServer } from "./parcelServer"
import request from 'supertest'

const queryData = {
    query: `query GetAParcel($parcelId: String) {
        getAParcel(parcelId: $parcelId) {
          id
          parcel_no
          parcel_weight
        }
      }`,
      variables: {parcelId: '637fbb41a10e8bed1c2d11ac'}

}



describe('demo - using external server with Mock DB', () => {
    let server: { stop: () => any }, url: any // before the tests we spin up a new Apollo Server
    beforeAll(async () => {
      ;({ server, url } = await createApolloServer({ port: 0 }))
    }) // after the tests we'll stop the server
    afterAll(async () => {
      await server?.stop()
    })
    it('get Parcel By ID', async () => {
      // send our request to the url of the test server
      const response = await request(url)
        .post('/')
        .send(queryData)
      // expect(response.body).toBe('H'); //See response object
      expect(response.body.data?.getAParcel).toBeTruthy();
      expect(response.body.data?.getAParcel).toEqual(
          expect.objectContaining({parcel_weight: 5})
      ) 
  });
  it('get All Parcels', async() => {
       const getAllQuery = {
        query:  `query {
            getAllParcels {
              id
              parcel_no
              parcel_weight
            }
          }`
        }
        const response = await request(url)
        .post('/')
        .send(getAllQuery)
          expect(response.body.data?.getAllParcels).toBeTruthy();
        expect(response.body.data?.getAllParcels).toEqual(
            expect.arrayContaining([
                expect.objectContaining({parcel_weight: 5})
            ])
        )
  })

  






})
    
  


