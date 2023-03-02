import { logger } from "../logger";
import Letter from "../models/Letter";
import Driver from "../models/Driver";
import utils from "../library/helpers";
import Depot from "../models/Depot";
import Parcel from "../models/Parcel";

const resolvers = {
  Query: {
    getAllLetters: async () => {
      logger.info('All letters being retrieved')
      return await Letter.find()
    },

    getALetter: async (_parent: any, args: any, _context: any, _info: any) => {
      logger.info('A letter being returned')
      const letterId = args.letterId
      return await Letter.findById(letterId)
    },

    getAllDrivers: async () => {
      logger.info("All Drivers retrieved");
      return await Driver.find();
    },

    getADriver: async (_parent: any, args: any, _context: any, _info: any) => {
      logger.info("A Driver returned");
      const driverId = args.driverId;
      return await Driver.findById(driverId);
    },
    getAllParcels: async() => {
      logger.info("All Parcels retrieved");
      return await Parcel.find();
    },

    getAParcel: async(_parent: any, args: any, _context: any, _info: any) => {
      logger.info("A parcel has been returned");
      const parcel_id = args.parcelId;
      return await Parcel.findById(parcel_id);
    },

    getAllDepots: async () => {
      logger.info('All depots being retrieved')
      return await Depot.find()
    },

    getADepot: async (_parent: any, args: any, _context: any, _info: any) => {
      logger.info('A depot being returned')
      const depotId = args.depotId
      return await Depot.findById(depotId)
    },

  },

  Letter: {
    dispatched: (letter: any) => new Date(letter.dispatched).toString()

  },

  Mutation: {
    createALetter: async (parent: any, args: any, context: any, info: any) => {
      const { address, delivery_class } = args.Letter
      const dispatched = new Date()
      const delivered = false

      const newLetter = new Letter({
        address,
        delivery_class,
        delivered,
        dispatched
      })

      logger.info('Letter Being Created')
      console.log(address)
      await newLetter.save()
      return newLetter
    },

    updateALetter: async (parent: any, args: any, context: any, info: any) => {
      const letterId = args.letterId
      const { address, delivery_class, delivered, dispatched } = args.Letter
      const updatedValues = args.Letter
      const originalValues = await Letter.findById(letterId)

      if (address !== undefined && address !== null && address !== '') {
        updatedValues.address = address
      } else {
        updatedValues.address = originalValues?.address
      }

      if (
        delivery_class !== undefined &&
        delivery_class !== null &&
        delivery_class !== ''
      ) {
        updatedValues.delivery_class = delivery_class
      } else {
        updatedValues.delivery_class = originalValues?.delivery_class
      }

      if (delivered !== undefined && delivered !== null && delivered !== '') {
        updatedValues.delivered = delivered
      } else {
        updatedValues.delivered = originalValues?.delivered
      }

      if (
        dispatched !== undefined &&
        dispatched !== null &&
        dispatched !== ''
      ) {
        updatedValues.dispatched = dispatched
      } else {
        updatedValues.dispatched = originalValues?.dispatched
      }

      logger.info('Letter Being Updated')
      return await Letter.findByIdAndUpdate(letterId, updatedValues, {
        new: true
      })
    },

    deleteALetter: async (parent: any, args: any, context: any, info: any) => {
      const letterId = args.letterId

      logger.info('Letter Being Deleted')
      return await Letter.findByIdAndDelete(letterId)
        .then(letter =>
          letter
            ? { message: 'Letter Deleted' }
            : { message: 'Letter NOT found' }
        )
        .catch(error => {
          logger.error(error)
          error
        })
    },

    createADepot: async (parent: any, args: any, context: any, info: any) => {
      const { city, workers } = args.Depot

      const newDepot = new Depot({
        city,
        workers
      })

      logger.info('Depot Being Created')

      await newDepot.save()
      return newDepot
    },

    updateADepot: async (parent: any, args: any, context: any, info: any) => {
      const depotId = args.depotId
      const { city, workers } = args.Depot

      const updatedValues = args.Depot
      const dep = await Depot.findById(depotId)

      if (city !== undefined) {
        updatedValues.city = city
      } else {
        updatedValues.city = dep?.city
      }

      if (workers !== undefined) {
        updatedValues.workers = workers
      } else {
        updatedValues.workers = dep?.workers
      }

      logger.info('Depot Being Updated')
      return await Depot.findByIdAndUpdate(depotId, updatedValues, {
        new: true
      })
    },

    deleteADepot: async (parent: any, args: any, context: any, info: any) => {
      const depotId = args.depotId;
  
      logger.info("Depot Being Deleted");
      return await Depot.findByIdAndDelete(depotId)
        .then((depot) =>
          depot
            ? { message: "Depot Deleted" }
            : { message: "Depot NOT found" }
        )
        .catch((error) => {
          logger.error(error);
          error;
        });
      },

      createADriver: async (parent: any, args: any, context: any, info: any) => {
        const { first_name, last_name, username, email, password } = args.Driver;
  
        const passwordEncryp = utils.hashPassword(password);
        const newDriver = new Driver ({
          first_name,
          last_name,
          username,
          email,
          password: passwordEncryp
        });
  
        logger.info("Driver Created");
        await newDriver.save();
        return newDriver;
      },

      updateADriver: async (parent: any, args: any, context: any, info: any) => {
        const driverId = args.driverId;
        const { first_name, last_name, email } = args.Driver;

        const updatedValues = args.Driver;

      if (first_name !== undefined) {
          updatedValues.first_name = first_name;
      }

      if (last_name !== undefined) {
          updatedValues.last_name = last_name;
      }

      if (email !== undefined) {
          updatedValues.email = email;
      }
        logger.info("Driver's Details Updated");
        return await Driver.findByIdAndUpdate(
            driverId,
            updatedValues,
            { new: true });

    },

      deleteADriver: async (parent: any, args: any, context: any, info: any) => {
        const driverId = args.driverId;
  
        logger.info("Driver Deleted");
        return await Driver.findByIdAndDelete(driverId)
          .then((driver) =>
            driver
              ? { message: "Driver Deleted" }
              : { message: "Driver NOT found" }
          )
          .catch((error) => {
            logger.error(error);
            error;
          });
        },

      createAParcel: async (parent: any, args: any, context: any, info: any) => {

      const{parcel_no, parcel_weight, status, estimated_delivery_days}  = args.Parcel
      
      const newParcel = new Parcel({
        parcel_no,
        parcel_weight,
        status,
        estimated_delivery_days
      })
      await newParcel.save();
      return newParcel;
  },

      updateAParcel: async (parent: any, args: any, context: any, info: any) => {
        const parcelId = args.parcelId
        const{parcel_weight, status, estimated_delivery_days}  = args.Parcel
        const updatedValues = args.Parcel
        const originalValues = await Parcel.findById(parcelId)
    
        if (parcel_weight !== undefined && parcel_weight !== null && parcel_weight !== "") {
          updatedValues.parcel_weight = parcel_weight;
        } else {
          updatedValues.parcel_weight = originalValues?.parcel_weight;
        }
    
        if (status !== undefined && status !== null && status !== "") {
          updatedValues.status = status;
        } else {
          updatedValues.status = originalValues?.status;
        }
    
        if (estimated_delivery_days !== undefined && estimated_delivery_days !== null && estimated_delivery_days !== "") {
          updatedValues.estimated_delivery_days = estimated_delivery_days;
        } else {
          updatedValues.estimated_delivery_days = originalValues?.estimated_delivery_days;
        }
    
        return await Parcel.findByIdAndUpdate(parcelId, updatedValues, {
          new: true,
        });
    
      },
      deleteAParcel: async (parent: any, args: any, context: any, info: any) => {
        const parcelId = args.parcelId;
    
        logger.info("Parcel Being Deleted");
        return await Parcel.findByIdAndDelete(parcelId)
          .then((letter) =>
            letter
              ? { message: "Parcel Deleted" }
              : { message: "Parcel NOT found" }
          )
          .catch((error) => {
            logger.error(error);
            error;
          });
      }
  }
};

export { resolvers }

