import { NextApiRequest, NextApiResponse } from "next";
import { Usuario } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, UserModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body as Usuario;
  const userName = req.headers.username as string;
  const resp = await UserModel.findOneAndUpdate(
    {
      _id: user.id,
    },
    user.contraseña !== ""
      ? user
      : {
          identificacion: user.identificacion,
          usuario: user.usuario,
          nombre: user.nombre,
          correo: user.correo,
          medico: user.medico,
          telefono: user.telefono,
          rol: user.rol,
          estado: user.estado,
        }
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo al Usuario:" + user.nombre,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Usuario no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Usuario editado",
    success: true,
  });
}
