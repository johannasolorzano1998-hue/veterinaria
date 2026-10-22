import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../database/connect/mongo";
import { UserModel } from "../../../database/schemas";
import remove from "../../../controllers/mongo/user/delete";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    try {
      //@ts-ignore
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Usuario encontrado",
        data: user,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error interno del servidor",
        success: false,
      });
    }
  }

  if (method === "PUT") {
    try {
      const { holidays } = req.body;

      //@ts-ignore
      const user = await UserModel.findByIdAndUpdate(
        id,
        { holidays },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Días de vacaciones actualizados correctamente",
        data: user,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error interno del servidor",
        success: false,
      });
    }
  }

  if(method === "DELETE") {
    await remove(req, res)
  }

  return res.status(405).json({
    message: "Método no permitido",
    success: false,
  });
}
