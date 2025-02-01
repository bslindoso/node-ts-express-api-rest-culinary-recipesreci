import fs from "fs"
import path from "path"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper"
import { UserModel } from "../models/user-model"

const FILENAME = "users.json"
const FILEPATH = path.join(__dirname, "..", "/data/", FILENAME)
const LANGUAGE = 'utf-8'


const readFile = async (): Promise<UserModel[] | Messages.INTERNAL_SERVER_ERROR> => {
  try {
    return JSON.parse(fs.readFileSync(FILEPATH, LANGUAGE))
  } catch (error) {
    return Messages.INTERNAL_SERVER_ERROR
  }
}

const saveOnFile = async (data: UserModel[]): Promise<void | Messages.INTERNAL_SERVER_ERROR> => {
  try {
    return fs.writeFileSync(FILEPATH, JSON.stringify(data), LANGUAGE)
  } catch (error) {
    return Messages.INTERNAL_SERVER_ERROR
  }

}

export const getUsersList = async (): Promise<UserModel[] | Messages.INTERNAL_SERVER_ERROR> => {
  return await readFile()
}

export const getUser = async (id: number): Promise<UserModel | Messages.NOT_FOUND | Messages.INTERNAL_SERVER_ERROR> => {
  let data = await readFile()
  if (data === Messages.INTERNAL_SERVER_ERROR) return data

  const foundUser: UserModel | undefined = data.find((user: UserModel) => user.id === id)
  if (!foundUser) return Messages.NOT_FOUND

  return foundUser
}

export const saveUser = async (user: UserModel): Promise<UserModel | Messages.INTERNAL_SERVER_ERROR> => {
  const data = await readFile()
  if (data === Messages.INTERNAL_SERVER_ERROR) return data
  // verify next ID
  const dataIds = data.map((user: UserModel) => user.id) // [1, 2, 3]
  const nextId = Math.max(...dataIds) + 1 // 3 + 1 = 4

  // set new user data
  const { id, ...userWithoutId } = user
  const newUser: UserModel = { id: nextId, ...userWithoutId, favorites: [] }

  data.push(newUser)

  // save on file
  const saved = await saveOnFile(data)
  if (saved === Messages.INTERNAL_SERVER_ERROR) return saved

  return newUser
}