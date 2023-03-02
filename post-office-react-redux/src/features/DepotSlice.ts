import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  
  import { Depot } from "../components/interfaces/depotinterface";
  import { RootState } from "../app/store";
  import gqlClient from "../graphql/client";
  import { gql } from "@apollo/client";
  
  export const fetchAllDepots = createAsyncThunk<Depot[]>(
    "depots/getAllDepots",
    async (_, thunkAPI) => {
      try {
        const response = await gqlClient.query({
          query: gql`
              query GetAllDepots {
                getAllDepots {
                  id
                  city
                  workers
                  services {service}
                }
              }
            `,
        });
  
        return response.data.getAllDepots;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const addNewDepot = createAsyncThunk(
    "depots/addANewDepot",
    async (depotInfo: Depot) => {
      try {
        const { city, workers } = depotInfo;
  
        const response = await gqlClient.mutate({
          mutation: gql`
            mutation CreateADepot {
                createADepot(Depot: {  
                    city: "${city}",
                    workers: ${workers}  
                }) {
                  id
                  city
                  workers
                  services { service }
                }
              } `,
        });
  
        return response.data.createADepot;
      } catch (error) {
        return error;
      }
    }
  );
  
  export const updateADepot = createAsyncThunk(
    "depots/updateADepot",
    async (depotInfo: Depot) => {
      try {
        const { id, city, workers } = depotInfo;
        const response = await gqlClient.mutate({
          mutation: gql`
                    mutation UpdateADepot {
                      updateADepot(depotId: "${id}" , 
                      Depot: {
                        city: "${city}",
                        workers: ${workers},
                          }  ) {
                            id
                            city
                            workers
                            services { service }
                          }
                        } `,
        });
  
        return response.data.updateADepot;
      } catch (error) {
        return error;
      }
    }
  );
  
  export const deleteADepot = createAsyncThunk(
    "depots/deleteADepot",
    async (depotInfo: Depot) => {
      try {
        const { id } = depotInfo;
        const response = await gqlClient.mutate({
          mutation: gql`
                 mutation DeleteADepot {
                  deleteADepot(depotId: "${id}" ) {
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
  
  const depotAdapter = createEntityAdapter({
    selectId: (depot: Depot) => depot.id,
  });
  
  const initialState = depotAdapter.getInitialState({
    loading: false,
    errors: null,
  });
  
  export const depotSlice = createSlice({
    name: 'depotData',
    initialState,
    reducers: {
      setdepots: (state, action: PayloadAction<Depot[]>) => {
        depotAdapter.setAll(state, action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllDepots.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllDepots.fulfilled, (state, action) => {
          state.loading = false;
          depotAdapter.setAll(state, action.payload);
        })
        .addCase(fetchAllDepots.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(addNewDepot.fulfilled, (state, action) => {
          depotAdapter.addOne(state, action.payload);
        })
        .addCase(updateADepot.fulfilled, (state, action) => {
          console.log(action.payload);
          depotAdapter.upsertOne(state, action.payload)
        })
        .addCase(deleteADepot.fulfilled, (state, action) => {
          if (!action.payload?._id) {
            console.log("Error Deleting, depot could not be deleted!");
            console.log(action.payload);
            return;
          }
          const { id } = action.payload;
          depotAdapter.removeOne(state, id)
        })
        ;
    },
  });
  
  
  
  const depotsSelectors = depotAdapter.getSelectors<RootState>(state => state.depot)
  
  export const {
    selectAll:      getAllDepots,
    selectById:     getDepotById,
    selectIds:      getAllDepotIds,
    selectEntities: getAllDepotEntities,
    selectTotal
  } = depotsSelectors;
  
  
  
  export const { setdepots } = depotSlice.actions;
  export default depotSlice.reducer;