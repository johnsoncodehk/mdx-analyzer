/**
 * @typedef {import('@volar/test-utils').LanguageServerHandle} LanguageServerHandle
 */
import assert from 'node:assert/strict'
import {afterEach, beforeEach, test} from 'node:test'
import {createServer, fixturePath, fixtureUri, tsdk} from './utils.js'

/** @type {LanguageServerHandle} */
let serverHandle

beforeEach(async () => {
  serverHandle = createServer()
  await serverHandle.initialize(fixtureUri('frontmatter'), {typescript: {tsdk}})
})

afterEach(() => {
  serverHandle.connection.dispose()
})

test('frontmatter', async () => {
  const {uri} = await serverHandle.openTextDocument(
    fixturePath('frontmatter/frontmatter.mdx'),
    'mdx'
  )
  const diagnostics = await serverHandle.sendDocumentDiagnosticRequest(uri)

  assert.deepEqual(diagnostics, {
    items: [],
    kind: 'full'
  })
})
