import { createApolloServer } from './depotServer'
import request from 'supertest' 

const queryData = {
    query: `query GetAllDepots {
        getAllDepots {
          id
          city
          workers
          services {
            service
          }
        }
      }`,
};

describe('Using external server with Mock Depot DB', () => {
    let server: { stop: () => any }, url: any
    beforeAll(async () => {
      ;({ server, url } = await createApolloServer({ port: 0 }))
    })
    afterAll(async () => {
      await server?.stop()
    })
  
    it('Should get all Depots', async () => {
      const response = await request(url).post('/').send(queryData)
      expect(response.body.data?.getAllDepots).toBeTruthy()
    })
  })