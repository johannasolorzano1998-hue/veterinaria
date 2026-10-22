import { NextApiRequest, NextApiResponse } from "next";
import {
  AuditoryModel,
  BackupCitasModel,
  CitaModel
} from "../../../database/schemas";
import { Cita } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cita = req.body as Cita;
  const userName = req.headers.username as string;
  const count: number = await BackupCitasModel.countDocuments();
  // fetch the posts
  const citapost = new CitaModel({ ...cita, number: count + 1 });

  await citapost.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo una cita: " + citapost.number,
  });
  await auditory.save();

  const backup = new BackupCitasModel({ cita: citapost._id });

  await backup.save();

  return res.status(200).json({
    message: "Cita Creada",
    success: true,
  });
}
