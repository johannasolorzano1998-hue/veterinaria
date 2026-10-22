import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../database/schemas";
import { Usuario } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const solicitude = await UserModel.findById(id, { password: 0 })

  return res.status(200).json({
    message: "un usuario",
    data: solicitude as Usuario,
    success: true,
  });
}