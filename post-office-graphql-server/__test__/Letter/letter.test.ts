import { createApolloServer } from "./letterServer";
import request from "supertest"; // this is the query for our test
import { LetterList } from "./letterServer";

const getAllLetters = {
  query: `query GetAllLetters {
    getAllLetters {
      address
      delivered
      delivery_class
      dispatched
      id
    }
  }`,
};

const getALetter = {
  query: `query GetALetter {
    getALetter(letterId: "637f711e6e49317fc888fb5b") {
      address
      delivery_class
      delivered
      dispatched
      id
    }
  }`,
};

const createALetter = {
  query: `mutation CreateALetter {
    createALetter(Letter: {
      address: "Hurst Farm, Wyre Road, Pershore",
      delivery_class: "First Class"
    }) {
      address
      delivered
      delivery_class
      dispatched
      id
    }
  }`,
};

const updateALetter = {
  query: `mutation UpdateALetter {
        updateALetter(letterId: "637f711e6e49317fc888fb63", Letter: {
          address: "Flat 6, Rushwood House, Hartland Road, Addlestone",
          delivered: true,
          delivery_class: "Second Class",
        }) {
          address
          delivered
          delivery_class
          dispatched
          id
        }
      }`,
};

const deleteALetter = {
  query: `mutation DeleteALetter {
        deleteALetter(letterId: "637f711e6e49317fc888fb5c") {
          error
          message
        }
      }`,
};
describe("Using an external server", () => {
  let server: { stop: () => any }, url: any;
  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
  });
  afterAll(async () => {
    await server?.stop();
  });

  test("Should return all letters", async () => {
    const response = await request(url).post("/").send(getAllLetters);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data?.getAllLetters).toEqual(LetterList);
  });

  test("Should return a letter", async () => {
    const response = await request(url).post("/").send(getALetter);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.getALetter).toEqual(
      expect.objectContaining({
        address: "Flat 6, Rushwood House, Hartland Road, Addlestone",
        delivery_class: "Second Class",
        delivered: false,
        dispatched: "Thu Jun 16 2022 11:00:00 GMT+0100 (British Summer Time)",
        id: "637f711e6e49317fc888fb5b",
      })
    );
  });

  test("Should create a letter", async () => {
    const response = await request(url).post("/").send(createALetter);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.createALetter).toEqual(
      expect.objectContaining({
        address: "Hurst Farm, Wyre Road, Pershore",
        delivered: false,
      })
    );
  });

  test("Should update a letter", async () => {
    const response = await request(url).post("/").send(updateALetter);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.updateALetter).toEqual(
      expect.objectContaining({
        address: "Flat 6, Rushwood House, Hartland Road, Addlestone",
        delivered: true,
        delivery_class: "Second Class",
      })
    );
  });

  test("Should delete a letter", async () => {
    const response = await request(url).post("/").send(deleteALetter);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.deleteALetter).toEqual(
      expect.objectContaining({
        message: "Letter Deleted",
      })
    );
  });
});
