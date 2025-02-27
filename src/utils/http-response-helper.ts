import { HttpResponse } from "../models/http-response-model";
import { StatusCode } from "./status-code";

// HTTP RESPONSES
export const ok = (data?: any): HttpResponse => {
  data = (typeof data === 'string') ? { message: data } : data
  return {
    statuscode: StatusCode.OK,
    body: (data) ? data : { message: HttpStatusMessage.OK }
  }
}

export const noContent = (): HttpResponse => {
  return {
    statuscode: StatusCode.NO_CONTENT,
    body: {}
  }
}

export const notFound = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.NOT_FOUND,
    body: (message) ? { message: message } : { message: HttpStatusMessage.NOT_FOUND }
  }
}

export const badRequest = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.BAD_REQUEST,
    body: (message) ? { message: message } : { message: HttpStatusMessage.BAD_REQUEST }
  }
}

export const conflict = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.CONFLICT,
    body: (message) ? { message: message } : { message: HttpStatusMessage.CONFLICT }
  }
}

export const internalServerError = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.INTERNAL_SERVER_ERROR,
    body: (message) ? { message: message } : { message: HttpStatusMessage.INTERNAL_SERVER_ERROR }
  }
}


// MESSAGES
export enum HttpStatusMessage {
  OK = "Success",
  BAD_REQUEST = "Bad request",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  INVALID_PROPERTIES = "One or more properties are invalid",
  INVALID_OR_MISSING_PROPERTIES = "One or more properties are invalid or missing",
  NOT_FOUND = "Not found",
  CONFLICT = "Conflict",
  INVALID_PARAMETERS = "One or more parameters are invalid",
  RECIPE_ID_NOT_FOUND = "Recipe ID not found",
  RECIPE_UPDATED_SUCCESSFULLY = "Recipe updated successfully",
  RECIPE_DELETED_SUCCESSFULLY = "Recipe deleted successfully",
  RATING_ADDED_SUCCESSFULLY = "Rating added successfully",
  RATING_EXISTS_FOR_THIS_USER = "Rating already exists for this user",
  USER_ID_NOT_FOUND = "User ID not found",
  USER_REGISTERED_SUCCESSFULLY = "User registered successfully",
  USER_ID_MUST_BE_A_NUMBER = "User ID must be a number",
  RECIPE_ID_MUST_BE_A_NUMBER = "Recipe ID must be a number",
  FAVORITE_CONFLICT = "Recipe already favorite for this user",
  FAVORITE_ADDED_SUCCESSFULLY = "Recipe added to favorites successfully",
  FAVORITE_REMOVED_SUCCESSFULLY = "Recipe removed from favorite successfully"
}
