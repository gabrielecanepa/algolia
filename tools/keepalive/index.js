import algoliasearch from 'algoliasearch'
import { config } from 'dotenv'

config()

const APP_IDS = process.env.ALGOLIA_APP_IDS.split(',')
const API_KEYS = process.env.ALGOLIA_API_KEYS.split(',')
const KEEPALIVE_INDEX = process.env.ALGOLIA_KEEPALIVE_INDEX || '_keepalive'

const run = async () => {
  for (const appId of APP_IDS) {
    try {
      // Init the client and keepalive index.
      console.info(`Initializing temporary index ${KEEPALIVE_INDEX} on ${appId}...`)
      const client = algoliasearch(appId, API_KEYS[APP_IDS.indexOf(appId)])
      const index = client.initIndex(KEEPALIVE_INDEX)
  
      // Execute an indexing operation by adding a dummy record.
      console.info(`Executing a record operation...`)
      await index.saveObject({}, { autoGenerateObjectIDIfNotExist: true })

      // Execute a search operation as soon as the index is available.
      console.info(`Executing a search operation...`)
      while (!await index.exists()) continue
      await index.search('')

      // Delete the keepalive index.
      console.info(`Executing an indexing operation...`)
      await index.delete()

      console.info(`Done! The application ${appId} is ready to be used.`)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

run()
