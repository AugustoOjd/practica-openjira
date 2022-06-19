// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  nick: string,
  method: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  res.status(200).json(
    { 
      name: 'John Doe', 
      nick: 'Parrin',
      method: req.method || 'no hay method'
    })
}
