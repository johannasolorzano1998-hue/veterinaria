import { NextApiRequest, NextApiResponse } from "next";
import { Especialidad } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, EspecialidadModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const especialidad = req.body as Especialidad;
  const userName = req.headers.username as string;

  const newSolicitude = (): Especialidad => {
    return especialidad;
  };

  const resp = await EspecialidadModel.findOneAndUpdate(
    {
      _id: especialidad.id,
    },
    newSolicitude()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo a la especialidad:" + especialidad.nombre,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Especialidad no encontrada",
      success: false,
    });

  return res.status(200).json({
    message: "Especialidad editada",
    success: true,
  });
}
