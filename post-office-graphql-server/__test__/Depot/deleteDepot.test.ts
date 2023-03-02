import { createApolloServer } from './depotServer'
import request from 'supertest' 

const queryData = {
    query: `mutation DeleteADepot {
        deleteADepot(depotId: "637f6f4fa8193b1f3dd44d70") {
          error
          message
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
  
    it("Depot should be deleted", async () => {
        const response = await request(url).post("/").send(queryData);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data?.deleteADepot).toEqual(
            expect.objectContaining({
              message: "Depot Deleted"
            }),
        );
      });
  })