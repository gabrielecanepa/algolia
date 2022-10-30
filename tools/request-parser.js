/* eslint-disable no-console */

import fs from 'fs'

const isJson = path => path.endsWith('.json')

const validateArgs = (input, output) => {
  if (!input) throw new Error('Please provide a file to transform')
  if (!output) throw new Error('Please provide an output file')
  if (!isJson(input) || !isJson(output) && output !== '.') throw new Error('Files must be in JSON format')
}

const parseValue = value => {
  const decodedValue = decodeURIComponent(value)

  try {
    return JSON.parse(decodedValue)
  } catch (e) {
    return decodedValue
  }
}

const parseRequest = ({ params, ...rest }) => {
  if (typeof params === 'object') return { ...params, ...rest }

  const parsedParams = params.split('&').reduce((obj, param) => {
    const [name, value] = param.split('=')
    return { ...obj, [name]: parseValue(value) }
  }, {})

  return { ...parsedParams, ...rest }
}

const parseData = data => {
  try {
    if (!data) return null

    const json = JSON.parse(data)
    if (!json.requests) return JSON.stringify(parseRequest(json), null, 2)

    const requests = json.requests.map(request => parseRequest(request))
    return JSON.stringify({ requests }, null, 2)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

const transform = (input, output) => {
  try {
    validateArgs(input, output)
  } catch ({ message }) {
    console.error(message)
    process.exit(1)
  }

  try {
    fs.readFile(input, 'utf8', (e, data) => {
      if (e) {
        console.error(e)
        process.exit(1)
      }

      // Override input file if second arg is `.`
      const outputFile = output === '.' ? input : output

      fs.writeFile(outputFile, parseData(data), _e => {
        if (_e) {
          console.error(_e)
          process.exit(1)
        }
      })
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

transform(...process.argv.slice(2))
