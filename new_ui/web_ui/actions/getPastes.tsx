export const getPastes = async (offset: number, auth_token: string) => {
  const host = process.env.NEXT_PUBLIC_PASTE_SERVICE_HOST;
  const port = process.env.NEXT_PUBLIC_PASTE_SERVICE_PORT;
  try {
    const pasteServiceUrl = `http://${host}:${port}/my_pastes?offset=${offset}`;
    const response = await fetch(pasteServiceUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth_token}`
      }
    });
    const data = (await response.json());
    return {
      status: response.status,
      data: data
    };
  } catch (error: unknown) {
    throw new Error(`An error happened: ${error}`);
  }
};
