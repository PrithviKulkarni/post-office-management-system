import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  
  import { RootState } from "../app/store";
  import gqlClient from "../graphql/client";
  import { gql } from "@apollo/client";
  import { Parcel } from "../components/interfaces/parcelInterface";


  export const fetchAllParcels = createAsyncThunk<Parcel[]>(
    "parcels/getAllParcels",
    async (_, thunkAPI) => {
      try {
        const response = await gqlClient.query({
          query: gql`
            query GetAllParcels {
              getAllParcels {
                id
                parcel_no
                parcel_weight
                status
                estimated_delivery_days
              }
            }
          `,
        });
  
        return response.data.getAllParcels;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const addNewParcel = createAsyncThunk(
    "parcels/addNewParcel",
    async (parcelInfo: Parcel) => {
      try {
        const {parcel_no, parcel_weight, status, estimated_delivery_days } = parcelInfo;
  
        const response = await gqlClient.mutate({

          mutation: gql`
          mutation CreateAParcel {
              createAParcel(Parcel: { 
                  parcel_no: ${parcel_no},
                  parcel_weight: ${parcel_weight},
                  status: "${status}",
                  estimated_delivery_days: ${estimated_delivery_days}  
              }) {
                    id
                    parcel_no
                    parcel_weight
                    status
                    estimated_delivery_days
              }
          } `,
           });
    
        return response.data.createAParcel;
      } catch (error) {
        return error;
      }
    }
  );

  export const updateAParcel = createAsyncThunk(
    "parcels/updateAParcel",
    async (parcelInfo: Parcel) => {
      try {
        const { id, parcel_no, parcel_weight, status, estimated_delivery_days } = parcelInfo;
  
        const response = await gqlClient.mutate({
          mutation: gql`
          mutation UpdateAParcel {  
            updateAParcel(parcelId: "${id}", Parcel: {
              parcel_no: ${parcel_no},
              parcel_weight: ${parcel_weight},
              status: "${status}",
              estimated_delivery_days: ${estimated_delivery_days},
              }) {
                id
                estimated_delivery_days
                parcel_no
                parcel_weight
                status
              }
            }`
        })
  
        return response.data.updateAParcel
      } catch (error) {
        return error
      }
    }
  );

  export const deleteAParcel = createAsyncThunk(
    "parcels/deleteAParcel",
    async (parcelId: string) => {
      try {
        
        const response = await gqlClient.mutate({
          mutation: gql`
                 mutation DeleteAParcel {
                  deleteAParcel(parcelId: "${parcelId}" ) {
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

  
const parcelAdapter = createEntityAdapter({
    selectId: (parcel: Parcel) => parcel.id,
  });
  
  const initialState = parcelAdapter.getInitialState({
    loading: false,
    errors: null,
  });
  
  export const parcelSlice = createSlice({
    name: "parcelData",
    initialState,
    reducers: {
      setParcels: (state, action: PayloadAction<Parcel[]>) => {
        parcelAdapter.setAll(state, action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllParcels.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllParcels.fulfilled, (state, action) => {
          state.loading = false;
          parcelAdapter.setAll(state, action.payload);
        })
        .addCase(fetchAllParcels.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(addNewParcel.fulfilled, (state, action) => {
          parcelAdapter.addOne(state, action.payload);
        })
        .addCase(updateAParcel.fulfilled, (state, action) => {
          console.log(action.payload);
          parcelAdapter.upsertOne(state, action.payload);
        })
        .addCase(deleteAParcel.fulfilled, (state, action) => {
          if (!action.payload?._id) {
            console.log("Error Deleting. Parcel could not be deleted!");
            console.log(action.payload);
            return;
          }
          const { _id } = action.payload;
          parcelAdapter.removeOne(state, _id);
        });
    },
  });

  const parcelSelector = parcelAdapter.getSelectors<RootState>(
    state => state.parcel
  );

  export const {
    selectAll: getAllParcels,
    selectById: getParcelById,
    selectIds: getAllParcelIds,
    selectEntities: getAllParcelEntities,
    selectTotal,
  } = parcelSelector;
  
  export const { setParcels } = parcelSlice.actions;
  export default parcelSlice.reducer