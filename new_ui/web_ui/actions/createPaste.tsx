export const createPaste = async (pasteTitle: string, pasteText: string, auth_token: string) => {
  const host = process.env.NEXT_PUBLIC_PASTE_SERVICE_HOST;
  const port = process.env.NEXT_PUBLIC_PASTE_SERVICE_PORT;
  const pasteServiceUrl = `http://${host}:${port}/my_pastes`;
  try {
    const response = await fetch(pasteServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth_token}`
      },
      body: JSON.stringify({
        title: pasteTitle,
        paste_text: pasteText
      })
    });
    const data = (await response.json());
    return {
      status: response.status,
      data: data
    };
  } catch (error: unknown) {
    throw new Error(`An error happened fetching pastes: ${error}`);
  }
};
