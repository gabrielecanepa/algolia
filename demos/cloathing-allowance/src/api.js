const API_BASE_URL = 'https://1dnz10.sse.codesandbox.io'

export const generateSecuredApiKey = async (opts = {}) => {
  const response = await fetch(`${API_BASE_URL}/key`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opts),
  })

  return response.json()
}
