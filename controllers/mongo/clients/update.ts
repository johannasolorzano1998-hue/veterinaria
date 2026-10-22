import { NextApiRequest, NextApiResponse } from "next";
import { Cliente } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, ClientModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = req.body;
  const userName = req.headers.username as string;

  if (client._id) {
    client.id = client._id;
  }

  // Limpiar las mascotas - remover campos que no son parte del schema
  if (client.mascotas && Array.isArray(client.mascotas)) {
    const mongoose = require('mongoose');
    client.mascotas = client.mascotas.map((mascota: any) => {
      const cleanMascota: any = {
        nombre: mascota.nombre,
        tipo: mascota.tipo,
        raza: mascota.raza,
        fechaNacimiento: mascota.fechaNacimiento,
      };
      
      // Si la mascota ya existe (tiene _id), convertirlo a ObjectId
      if (mascota._id) {
        try {
          cleanMascota._id = mongoose.Types.ObjectId.isValid(mascota._id)
            ? new mongoose.Types.ObjectId(mascota._id)
            : new mongoose.Types.ObjectId();
        } catch {
          cleanMascota._id = new mongoose.Types.ObjectId();
        }
      } else {
        // Si es nueva, generar un _id nuevo
        cleanMascota._id = new mongoose.Types.ObjectId();
      }
      
      if (mascota.number) {
        cleanMascota.number = mascota.number;
      }
      
      return cleanMascota;
    });
  }

  const newSolicitude = (): Cliente => {
    return client;
  };

  console.log("Cliente a actualizar:", client.id);
  console.log("Mascotas:", client.mascotas);

  const resp = await ClientModel.findOneAndUpdate(
    {
      _id: client.id,
    },
    newSolicitude(),
    { new: true } // Retornar el documento actualizado
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo al cliente:" + client.nombre,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Cliente no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Cliente editado",
    success: true,
  });
}
