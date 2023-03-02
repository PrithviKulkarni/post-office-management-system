import { createApolloServer } from './depotServer'
import request from 'supertest' 

const queryData = {
    query:`mutation CreateADepot {
        createADepot(Depot: {
          city: "Test",
          workers: 99
        }) {
          city
          workers
          id
        }
      }` ,
};

describe('Using external server with Mock Depot DB', () => {
    let server: { stop: () => any }, url: any
    beforeAll(async () => {
      ;({ server, url } = await createApolloServer({ port: 0 }))
    })
    afterAll(async () => {
      await server?.stop()
    })
  
    test("Creates a depot", async () => {
        const response = await request(url).post("/").send(queryData);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data?.createADepot).toEqual(
          expect.objectContaining({
            city: "Test"
          })
        );
        expect(response.body.data?.createADepot).toEqual(
            expect.objectContaining({
              workers: 99
            })
          );
      });
  })