import { createApolloServer } from '../Driver/driverServer';
import request from 'supertest';

const getADriver = {
    query: `query GetADriver($driverId: String) {
        getADriver(driverId: $driverId) {
          id
          first_name
          last_name
          username
          email
          password
        }
      }`,
    variables: { driverId: "637f83987bc5948d7a2137c5" },
};

const createADriver = {
    query: `mutation CreateADriver($driver: DriverInput) {
        createADriver(Driver: $driver) {
          id
          first_name
          last_name
          username
          email
          password
        }
      }`,

    variables: {
        driver: {
            first_name: "Beth",
            last_name: "Lehem",
            username: "Beth2022",
            email: "BethLehem@outlook.com",
            password: "0oijuhgfdxsc"
        }
    },
};

const updateADriver = {
    query: `mutation UpdateADriver($driverId: String, $driver: DriverInput) {
        updateADriver(driverId: $driverId, Driver: $driver) {
          id
          first_name
          last_name
          username
          email
          password
        }
      }`,

    variables: {
        driverId: "637f83987bc5948d7a2137c5",
        driver: {
            first_name: "Alvin",
            last_name: "Seville",
            email: "AlvinSevilleChipmunks@gmail.com",
        }
    },
};

const deleteADriver = {
    query: `mutation DeleteADriver {
        deleteADriver(driverId: "637f83987bc5948d7a2137c5") {
          message
          error
        }
      }`,
  };

describe('Using external server with Mock Driver DB', () => {
    let server: { stop: () => any; }, url: any;
    beforeAll(async () => {
        ({ server, url } = await createApolloServer({ port: 0 }));
    });
    afterAll(async () => {
        await server?.stop();
    });

    it('Should Get Driver By ID', async () => {
        const response = await request(url).post('/').send(getADriver);
        expect(response.body.data?.getADriver).toEqual(
            expect.objectContaining({ email: 'AlvinSeville@gmail.com' })
        );
    });

    it('Should Get All Drivers', async () => {
        const getAll = {
            query: `query GetAllDrivers {
                getAllDrivers {
                  id
                  first_name
                  last_name
                  username
                  email
                  password
                }
              }`,
        };

        const response = await request(url).post('/').send(getAll);
        expect(response.body.data?.getAllDrivers).toBeTruthy();

    })

    it('Should Create New Driver', async () => {
        const response = await request(url).post('/').send(createADriver);
        // expect(response.body.data?.getADriver).toBeTruthy();
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data?.createADriver).toEqual(
            expect.objectContaining({ email: 'BethLehem@outlook.com' })
        );
    })

    it('Should Update A Driver', async () => {
        const response = await request(url).post('/').send(updateADriver);
        // expect(response.body.data?.getADriver).toBeTruthy();
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data?.updateADriver).toEqual(
            expect.objectContaining({
                first_name: "Alvin",
                last_name: "Seville",
                email: "AlvinSevilleChipmunks@gmail.com"
            })
        )
    });

    it("Should Delete a Driver", async () => {
        const response = await request(url).post("/").send(deleteADriver);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.deleteADriver).toEqual(
            expect.objectContaining({
              message: "Driver Deleted"
            }),
        );
      });
})