import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    createEntityAdapter
  } from '@reduxjs/toolkit'

  import { Driver } from '../components/interfaces/driverinterface';
  import { RootState } from "../app/store";
  
  import gqlClient from "../graphql/client";
  import { gql } from '@apollo/client'
  
  export const fetchAllDrivers = createAsyncThunk<Driver[]>(
    'allDrivers/fetchAllDrivers',
    async (_, thunkAPI) => {
      try {
        const response = await gqlClient.query({
          query: gql`
          query GetAllDrivers {
            getAllDrivers {
              id
              first_name
              last_name
              username
              email
              password
            }
          }
          `
        })
  
        return response.data.getAllDrivers
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    }
  )
  
  export const addNewDriver = createAsyncThunk(
    'allDrivers/addNewDriver',
    async (driverInfo: Driver) => {
      try {
        const { username, first_name, last_name, email, password } = driverInfo
  
        const response = await gqlClient.mutate({
          mutation: gql`
                  mutation CreateADriver {
                    createADriver(Driver: {
                      first_name: "${first_name}",
                      last_name: "${last_name}",
                      username: "${username}",
                      email: "${email}"
                      password: "${password}",
                      }) {
                        id
                        first_name
                        last_name
                        username
                        email
                        password
                      }
                    } `
        })
        return response.data.createADriver
      } catch (error) {
        return error
      }
    }
  )
  
  export const updateADriver = createAsyncThunk(
    'allDrivers/updateADriver',
    async (driverInfo: Driver) => {
      try {
        const { id, first_name, last_name, email } = driverInfo
  
        const response = await gqlClient.mutate({
          mutation: gql`
          mutation UpdateADriver {
            updateADriver(driverId: "${id}", Driver: {
              first_name: "${first_name}",
              last_name: "${last_name}",
              email: "${email}"
            }) {
              id
              first_name
              last_name
              username
              email
              password
            }
          }`
        })
  
        return response.data.updateADriver
      } catch (error) {
        return error
      }
    }
  )
  
  export const deleteADriver = createAsyncThunk(
    'allDrivers/deleteADriver',
    async (driverInfo: Driver) => {
      try {
        const { id } = driverInfo
        const response = await gqlClient.mutate({
          mutation: gql`
               mutation DeleteADriver {
                  deleteADriver(driverId: "${id}" ) {
                    error
                    message
                  }
                }      
                `
        })
        return response.data
      } catch (error) {
        return error
      }
    }
  )
  
  const driverAdapter = createEntityAdapter({
    selectId: (driverInfo: Driver) => driverInfo.id
  })
  
  const initialState = driverAdapter.getInitialState({
    loading: false,
    errors: null
  })
  
  export const driverSlice = createSlice({
    name: 'DriverData',
    initialState,
    reducers: {
      setDriver: (state, action: PayloadAction<Driver[]>) => {
        driverAdapter.setAll(state, action.payload)
      }
    },
    extraReducers: builder => {
      builder
        .addCase(fetchAllDrivers.pending, state => {
          state.loading = true
        })
        .addCase(fetchAllDrivers.fulfilled, (state, action) => {
          state.loading = false
          driverAdapter.setAll(state, action.payload)
        })
        .addCase(fetchAllDrivers.rejected, (state, action) => {
          state.loading = false
        })
        .addCase(addNewDriver.fulfilled, (state, action) => {
          driverAdapter.addOne(state, action.payload)
        })
        .addCase(updateADriver.fulfilled, (state, action) => {
          console.log(action.payload)
          driverAdapter.upsertOne(state, action.payload)
        })
        .addCase(deleteADriver.fulfilled, (state, action) => {
          if (!action.payload?.id) {
            console.log('Error Deleting, Driver could not be deleted!')
            console.log(action.payload)
            return
          }
          const { id } = action.payload
          driverAdapter.removeOne(state, id)
        })
    }
  })
  
  const driverSelectors = driverAdapter.getSelectors<RootState>(
    state => state.driver
  )
  
  export const {
    selectAll: getAllDrivers,
    selectById: getDriverById,
    selectIds: getAllDriversIds,
    selectEntities: getAllDriversEntities,
    selectTotal
  } = driverSelectors
  
  export const { setDriver } = driverSlice.actions
  export default driverSlice.reducer
  