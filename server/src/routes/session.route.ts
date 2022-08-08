import express from "express";
import validateRequest from "./../middleware/validateRequest";
import { createSessionSchema } from "./../schemas/sesion.schema";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionsHandler,
} from "./../controllers/session.controller";
import requireUser from "./../middleware/requireUser";
const sessions = express();

sessions
  .route("/")
  .get(requireUser, getSessionsHandler)
  .post(validateRequest(createSessionSchema), createSessionHandler)
  .delete(requireUser, deleteSessionHandler);

export default sessions;
