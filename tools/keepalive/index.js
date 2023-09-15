import algoliasearch from 'algoliasearch'
import { config as configDotenv } from 'dotenv'

configDotenv()

const APP_IDS = process.env.ALGOLIA_APP_IDS.split(',')
const API_KEYS = process.env.ALGOLIA_API_KEYS.split(',')
const KEEPALIVE_INDEX_NAME = process.env.ALGOLIA_KEEPALIVE_INDEX_NAME || '_keepalive'

const run = async () => {
  for (const [i, appId] of APP_IDS.entries()) {
    try {
      // Init the client and keepalive index.
      console.log(`Initializing the temporary index ${KEEPALIVE_INDEX_NAME} on ${appId}...`)
      const client = algoliasearch(appId, API_KEYS[APP_IDS.indexOf(appId)])
      const index = client.initIndex(KEEPALIVE_INDEX_NAME)
  
      // Execute an indexing operation by adding a dummy record.
      console.log(`Executing a record operation by adding a dummy record...`)
      await index.saveObject({}, { autoGenerateObjectIDIfNotExist: true })

      // Execute a search operation as soon as the index is available.
      console.log(`Executing a search operation...`)
      while (!await index.exists()) continue

      // Delete the keepalive index.
      console.log(`Executing an index operation by deleting the temporary index...`)
      await index.delete()

      console.log(`Done! The application is ready to be used.`)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

run()
