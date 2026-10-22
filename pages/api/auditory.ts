import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../database/connect/mongo";
import { AuditoryModel } from "../../database/schemas";
import { Auditory } from "../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // connect to the database
    await dbConnect();

    if (req.method !== 'GET') throw new Error('Invalid method')

    // fetch the posts
    const auditories = await AuditoryModel.find({})

    return res.status(200).json({
      message: "Todas las auditorias",
      data: auditories as Array<Auditory>,
      success: true,
    });

  } catch (error) {
    console.error(error);
    // return the error
    return res.status(500).json({
      message: new Error(error).message,
      success: false,
    });
  }
}
