import { createApolloServer } from './depotServer'
import request from 'supertest'

const queryData = {
  query: `query GetADepot($depotId: String) {
        getADepot(depotId: $depotId) {
          id
          city
          workers
          services {service}
        }
      }`,
  variables: { depotId: '637f6f4fa8193b1f3dd44d70' }
}

describe('Using external server with Mock Depot DB', () => {
  let server: { stop: () => any }, url: any
  beforeAll(async () => {
    ;({ server, url } = await createApolloServer({ port: 0 }))
  })
  afterAll(async () => {
    await server?.stop()
  })

  it('Should get Depot By ID', async () => {
    const response = await request(url).post('/').send(queryData)
    expect(response.body.data?.getADepot).toBeTruthy()
    expect(response.body.data?.getADepot).toEqual(
      expect.objectContaining({ city: 'Nottingham' })
    )
    expect(response.body.data?.getADepot).toEqual(
      expect.objectContaining({ workers: 31 })
    )
  })
})
