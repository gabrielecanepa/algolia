import algoliasearch from 'algoliasearch'

const sourceClient = algoliasearch('<SOURCE_APP_ID>', '<SOURCE_API_KEY>')
const sourceIndex = sourceClient.initIndex('<SOURCE_INDEX>')

const targetClient = algoliasearch('<TARGET_APP_ID>', '<TARGET_API_KEY>')
const targetIndex = targetClient.initIndex('<TARGET_INDEX>')

;(async () => {
  // Hits
  const hits = []
  await sourceIndex.browseObjects({ batch: batch => hits.push(batch) })
  await targetIndex.saveObjects(hits)

  // Settings
  const settings = await sourceIndex.getSettings()
  await targetIndex.setSettings(settings)

  // Synonyms
  const synonyms = await sourceIndex.browseSynonyms()
  await targetIndex.saveSynonyms(synonyms)

  // Rules
  const rules = await sourceIndex.browseRules()
  await targetIndex.saveRules(rules)
})()
