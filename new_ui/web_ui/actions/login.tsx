export const login = async(username: string, password: string, rememberMe: boolean) => {
  const host = process.env.NEXT_PUBLIC_AUTH_SERVICE_HOST;
  const port = process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT;
  const authServiceUrl = `http://${host}:${port}/login`;
  try {
    const response = await fetch(authServiceUrl, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: username,
        password: password,
        remember_me: rememberMe
      })
    });
    const data = (await response.json());
    return {
      status: response.status,
      data: data
    };
  } catch (error: unknown) {
    throw new Error(`An error happened logging in: ${error}`);
  }
};
