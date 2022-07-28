import { object, string, TypeOf } from "zod";

const payload = {
   body:object({
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }),
    location: string({ required_error: "Location is required" }),
   })
}

const params = {
   params:object({
      spotId: string({ required_error: "Spot Id is required" }),
   })
}

export const createSpotSchema = object({...payload})
export const updateSpotSchema = object({...payload,...params})
export const findSpotSchema = object({...params})
export const deleteSpotSchema = object({...params})

export type CreateSpotType = TypeOf<typeof createSpotSchema>
export type UpdateSpotType = TypeOf<typeof updateSpotSchema>
export type FindSpotType = TypeOf<typeof findSpotSchema>
export type DeleteSpotType = TypeOf<typeof deleteSpotSchema>
