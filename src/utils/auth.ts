import type { UserCredentials } from "../types/types";


export const DEFAULT_USER: UserCredentials = {
  username: 'genesys@admin.com',
  password: 'genesys@123',
};

export const sendMessage = async (data: { query: string; history_json: any[] }) => {
  const response = await fetch('/API/agent_chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }
  console.log(response);
  return response.json();
};