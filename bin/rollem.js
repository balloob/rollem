#!/usr/bin/env node

'use strict'

const fs = require('fs')
const join = require('path').join
const argv = require('minimist')(process.argv.slice(2))

const configFilename = argv.c || 'rollem.config.js'

const configName = join(process.cwd(), configFilename)
if (!fs.existsSync(configName)) {
  console.error('Cannot find', configName)
  process.exit(-1)
}

const config = require(configName)
const rollem = require(join(__dirname, '..'))

function isWatchArgument (arg) {
  return arg === '-w' || arg === '--watch'
}
const isWatching = process.argv.some(isWatchArgument)
const options = {
  watch: isWatching
}

rollem(config, options)
  .catch((err) => {
    console.error('Problem rolling them')
    console.error(err.message)
    console.error(err.stack)
    process.exit(-1)
  })
