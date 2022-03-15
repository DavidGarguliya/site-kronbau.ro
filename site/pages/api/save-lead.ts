import { API_ENDPOINTS, getApiUrl } from "landmarks-ds"
import { NextApiRequest, NextApiResponse } from "next"

interface IData {
  data: string
}

interface IError {
  error: string
}

export default async function submitLead(
  req: NextApiRequest,
  res: NextApiResponse<IData | IError>
) {
  const { body } = req
  const url = getApiUrl(API_ENDPOINTS.SAVE_LEAD)

  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body,
    })
    const response = await rawResponse.json()
    console.log(`response`, response)

    if (response.error) {
      return res.status(400).send(response)
    }

    return res.status(200).send({
      data: 'Thank you for your interest'
    })
  } catch(e) {
    return res.status(500).send({
      error: 'Something went wrong'
    })
  }
}