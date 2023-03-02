import { createApolloServer } from './depotServer'
import request from 'supertest'

const queryData = {
  query: `mutation UpdateADepot($depotId: String, $depot: DepotInput) {
    updateADepot(depotId: $depotId, Depot: $depot) {
      id
      city
      workers
    }
  }` ,
  variables: { depotId: '637f6f4fa8193b1f3dd44d70', depot: { city: "LLL", workers: 88 }}
}

describe('Using external server with Mock Depot DB', () => {
  let server: { stop: () => any }, url: any
  beforeAll(async () => {
    ;({ server, url } = await createApolloServer({ port: 0 }))
  })
  afterAll(async () => {
    await server?.stop()
  })

  it('Depot updates', async () => {
    const response = await request(url).post('/').send(queryData);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data?.updateADepot).toEqual(
        expect.objectContaining({
            city: "LLL",
            workers: 88
        })
    );
})
})