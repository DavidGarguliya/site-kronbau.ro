import { NextApiRequest, NextApiResponse } from "next"

import { query } from '.keystone/api'
import { updateSheet } from 'landmarks-ds'

// currently we just update the spreadsheet with the possible new units from the db
export default async function runSyncOperation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('========Running SYNC operation========')
  const projects = await query.Project.findMany({
    query: `
      id
      slug
      units {
        id
        slug
        title
        building {
          title
        }
      }
    `
  })
  const updateSucceded = await updateSheet(projects)
  console.log('========Running SYNC operation', updateSucceded, '========')
  res.send({
    success: true
  })
}