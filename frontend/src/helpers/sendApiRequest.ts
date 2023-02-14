type Method = "GET" | "POST" | "PUT" | "DELETE";

import { ResponseUser } from "../pages/auth/_interfaces";

function returnCorrectRequest(
  method: Method,
  user: ResponseUser,
  data: unknown = {}
): RequestInit {
  if (method === "GET") {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
  }

  return {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
}

export async function sendApiRequest<T>(
  url: string,
  method: Method,
  user: ResponseUser,
  data? : any
): Promise<T> {
  
  const response = await fetch(url, returnCorrectRequest(method, user, data));

  if (!response.ok) {
    const message = `An Error Occured : ${response.status}`
    throw new Error(message)
    
  }

  return await response.json() as Promise<T>;
}
