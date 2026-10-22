import { NextApiRequest, NextApiResponse } from "next";
import {
  AuditoryModel,
  BackupMedicosModel,
  MedicosModel,
} from "../../../database/schemas";
import { Medico } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const medico = req.body as Medico;
  const userName = req.headers.username as string;
  const count: number = await BackupMedicosModel.countDocuments();
  // fetch the posts
  const medicopost = new MedicosModel({ ...medico, number: count + 1 });

  await medicopost.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo un medico: " + medicopost.nombres,
  });
  await auditory.save();

  const backup = new BackupMedicosModel({ medico: medicopost._id });

  await backup.save();

  return res.status(200).json({
    message: "Medico Creado",
    success: true,
  });
}
