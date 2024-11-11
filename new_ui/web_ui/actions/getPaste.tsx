export const getPaste = async (paste_id: string) => {
  const host = process.env.NEXT_PUBLIC_PASTE_SERVICE_HOST;
  const port = process.env.NEXT_PUBLIC_PASTE_SERVICE_PORT;
  const pasteServiceUrl = `http://${host}:${port}/paste/${paste_id}`;
  try {
    const response = await fetch(pasteServiceUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
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
