import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { Letter } from "../components/interfaces/letterInterface";
import { RootState } from "../app/store";
import gqlClient from "../graphql/client";
import { gql } from "@apollo/client";

export const fetchAllLetters = createAsyncThunk<Letter[]>(
  "letters/getAllLetters",
  async (_, thunkAPI) => {
    try {
      const response = await gqlClient.query({
        query: gql`
          query GetAllLetters {
            getAllLetters {
              id
              address
              delivery_class
              delivered
              dispatched
            }
          }
        `,
      });

      return response.data.getAllLetters;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewLetter = createAsyncThunk(
  "letters/addANewLetter",
  async (letterInfo: Letter) => {
    try {
      const { address, delivery_class } = letterInfo;

      const response = await gqlClient.mutate({
        mutation: gql`
        mutation CreateALetter {
            createALetter(Letter: {  
                address: "${address}",
                delivery_class: "${delivery_class}"   
            }) {
              address
              delivered
              delivery_class
              dispatched
              id
            }
          } `,
      });

      return response.data.createALetter;
    } catch (error) {
      return error;
    }
  }
);

export const updateALetter = createAsyncThunk(
  "letters/updateALetter",
  async (letterInfo: Letter) => {
    try {
      const { id, address, delivery_class, delivered } = letterInfo;
      const response = await gqlClient.mutate({
        mutation: gql`
                mutation UpdateALetter {
                  updateALetter(letterId: "${id}" , 
                  Letter: {
                    address: "${address}",
                    delivery_class: "${delivery_class}",
                    delivered: ${delivered},
                      }  ) {
                        id
                        address
                        delivery_class
                        delivered
                        dispatched
                      }
                    } `,
      });

      return response.data.updateALetter;
    } catch (error) {
      return error;
    }
  }
);

export const deleteALetter = createAsyncThunk(
  "letters/deleteALetter",
  async (letterInfo: Letter) => {
    try {
      const { id } = letterInfo;
      const response = await gqlClient.mutate({
        mutation: gql`
               mutation DeleteALetter {
                deleteALetter(letterId: "${id}" ) {
                    message
                    error
                  }
                }      
                `,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const letterAdapter = createEntityAdapter({
  selectId: (letter: Letter) => letter.id,
});

const initialState = letterAdapter.getInitialState({
  loading: false,
  errors: null,
});

export const letterSlice = createSlice({
  name: "letterData",
  initialState,
  reducers: {
    setLetters: (state, action: PayloadAction<Letter[]>) => {
      letterAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLetters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllLetters.fulfilled, (state, action) => {
        state.loading = false;
        letterAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllLetters.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewLetter.fulfilled, (state, action) => {
        letterAdapter.addOne(state, action.payload);
      })
      .addCase(updateALetter.fulfilled, (state, action) => {
        console.log(action.payload);
        letterAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteALetter.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log("Error Deleting. Letter could not be deleted!");
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        letterAdapter.removeOne(state, _id);
      });
  },
});

const letterSelector = letterAdapter.getSelectors<RootState>(
  (state) => state.letter
);

export const {
  selectAll: getAllLetters,
  selectById: getLetterById,
  selectIds: getAllLetterIds,
  selectEntities: getAllLetterEntities,
  selectTotal,
} = letterSelector;

export const { setLetters } = letterSlice.actions;
export default letterSlice.reducer;
