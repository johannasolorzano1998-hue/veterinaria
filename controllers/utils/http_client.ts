import { ResponseData } from "../../models";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const HttpClient = async (path: string, method: Method, userName: string, role: number, body?: any): Promise<ResponseData> => {
  try {
    const request: Response = await fetch(path, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "username": userName,
        "role": role.toString(),
      },
    });
    const response: ResponseData = await request.json();
    return response;
  } catch (error) {
    return {
      message: "Error en la red",
      success: false,
    };
  }
};

export default HttpClient;
