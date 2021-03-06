import { Response } from "express";
import * as bcrypt from "bcrypt";

import * as dbConnection from "../../config/db";

import { UserFields } from "../../shared/enums/-index";
import { User } from "../../shared/interfaces/-index";

const camelCase = require("camelcase-keys");

const db = dbConnection.default;


/**
 * @description Insert New User MySQL Query
 *
 * @param {User} body
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function addNewUserQuery(body: User, res: Response): Promise<void> {
  await db(UserFields.Table)
  .insert(body)
  .catch(err => err);
  
  res.sendStatus(201);
}


/**
 * @description Update Project MySQL Query
 *
 * @param {String} id
 * @param {User} body
 *
 * @returns {Promise<void>}
 */
export async function updateUserQuery(id: string, body: User, res: Response): Promise<void> {
  await db(UserFields.Table)
  .where({ id })
  .update(body)
  .catch(err => err);
  
  res.sendStatus(200);
}


/**
 * @description Get All Users MySQL Query
 *
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function getAllUserQuery(res: Response): Promise<void> {
  const fetchUser = await db(UserFields.Table).select();
  const result = camelCase(fetchUser);
  
  res.json(<User[]>result);
}


/**
 * @description Get User By Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function getUserQuery(id: string, res: Response): Promise<void> {
  const fetchUser = await db(UserFields.Table).where({ id });
  const result = camelCase(fetchUser);
  
  res.json(<User>result);
}


/**
 * @description Delete User By Id MySQL Query
 *
 * @param {String} id
 * @param {Response} res
 *
 * @returns {Promise<void>}
 */
export async function deleteUserQuery(id: string, res: Response): Promise<void> {
  await db(UserFields.Table)
  .where({ id })
  .del()
  .catch(err => err);
  
  res.sendStatus(204);
}


/**
 * @description Get User's Hashed Password
 *
 * @param {string} password
 *
 * @returns {Promise<string>}
 */
export async function getUserHashedPassword(id: string, password: string, res: Response): Promise<any> {
  const userDbPassword = await db(UserFields.Table).select("password").where({ id });
  const hashedPassword = userDbPassword[0].password;
  const isPasswordIdenticalToServer = bcrypt.compareSync(password, hashedPassword);
  
  res.json(isPasswordIdenticalToServer);
}


export async function changeUserPassword(body: User, res: Response): Promise<any> {
  body.password = await bcrypt.hashSync(body.password, bcrypt.genSaltSync(8));
  
  await db(UserFields.Table)
  .where({ id: body.id })
  .update(body)
  .catch(err => err);
  
  res.sendStatus(200);
}