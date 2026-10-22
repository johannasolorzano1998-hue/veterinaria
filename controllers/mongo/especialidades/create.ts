import { NextApiRequest, NextApiResponse } from "next";
import {
  AuditoryModel,
  EspecialidadModel,
} from "../../../database/schemas";
import { Especialidad } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const especialidad = req.body as Especialidad;
  const userName = req.headers.username as string;
  // fetch the posts
  const especialidadpost = new EspecialidadModel({ ...especialidad });

  await especialidadpost.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo una especialidad: " + especialidadpost.name,
  });
  await auditory.save();

  return res.status(200).json({
    message: "Especialidad Creada",
    success: true,
  });
}
