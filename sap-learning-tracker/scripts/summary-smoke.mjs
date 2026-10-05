import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { once } from 'node:events'
import { createServer } from 'vite'
import { courseSummaries, summaryForResource } from '../src/courseSummaries.js'

const chrome = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find(existsSync)
assert.ok(chrome, 'Set CHROME_PATH to a Chrome or Edge executable')
for (const guide of Object.values(courseSummaries)) {
  assert.ok(guide.sections.length >= 5)
  for (const chapter of guide.sections) {
    for (const field of ['title', 'example', 'remember', 'question', 'answer', 'source']) assert.ok(chapter[field])
    assert.equal(new URL(chapter.source).protocol, 'https:')
    assert.ok(chapter.paragraphs.length >= 2)
  }
}

const server = await createServer({ server: { host: '127.0.0.1', port: 0 } })
await server.listen()
const port = server.httpServer.address().port
const browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'sap-summary-test-'))}`, 'about:blank'],
{ windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] })
let socket
try {
  const endpoint = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Browser startup timed out')), 20000)
    let stderr = ''
    browser.stderr.on('data', (chunk) => {
      stderr += chunk
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/)
      if (match) { clearTimeout(timeout); resolve(match[1]) }
    })
    browser.on('error', (error) => { clearTimeout(timeout); reject(error) })
    browser.on('exit', (code) => { clearTimeout(timeout); reject(new Error(`Browser exited: ${code}`)) })
  })
  socket = new WebSocket(endpoint)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  let counter = 0
  const pending = new Map()
  const exceptions = []
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text)
    if (message.id) {
      const request = pending.get(message.id)
      if (!request) return
      pending.delete(message.id)
      clearTimeout(request.timeout)
      if (message.error) request.reject(new Error(message.error.message))
      else request.resolve(message.result)
    }
  }
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++counter
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)) }, 15000)
    pending.set(id, { resolve, reject, timeout })
    socket.send(JSON.stringify({ id, method, params, sessionId }))
  })
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
  const page = (method, params) => send(method, params, sessionId)
  const evaluate = async (expression) => {
    const result = await page('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  await page('Runtime.enable')
  await page('Page.enable')
  await page('Page.navigate', { url: `http://127.0.0.1:${port}` })
  await evaluate(`new Promise((resolve, reject) => {
    const start = Date.now(); const poll = () => {
      if (document.querySelectorAll('.week-card').length === 12) resolve(true);
      else if (Date.now() - start > 10000) reject(new Error('App did not render'));
      else setTimeout(poll, 50);
    }; poll();
  })`)
  assert.equal(await evaluate(`document.querySelectorAll('.summary-button').length`), 82)
  await evaluate(`document.querySelector('.task-list input').click(); new Promise(r => setTimeout(r, 50))`)
  const saved = await evaluate(`localStorage.getItem('sap-learning-tracker-weeks')`)
  const resources = await evaluate(`Array.from(document.querySelectorAll('.week-card > .course-actions a')).map(a => a.href)`)
  const titles = resources.map((url) => courseSummaries[summaryForResource(url)].title)
  for (let i = 0; i < 12; i++) {
    await evaluate(`document.querySelectorAll('.course-actions .summary-button')[${i}].focus(); document.querySelectorAll('.course-actions .summary-button')[${i}].click(); new Promise(r => setTimeout(r, 30))`)
    assert.equal(await evaluate(`document.querySelector('dialog[open] h2').textContent`), titles[i])
    assert.equal(await evaluate(`document.body.style.overflow`), 'hidden')
    assert.equal(await evaluate(`document.activeElement.className`), 'reader-close')
    assert.equal(await evaluate(`document.querySelector('.reader-question details').open`), false)
    await evaluate(`document.querySelector('.reader-question summary').click()`)
    assert.equal(await evaluate(`document.querySelector('.reader-question details').open`), true)
    await page('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await page('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await evaluate(`new Promise(r => setTimeout(r, 30))`)
    assert.equal(await evaluate(`document.querySelector('dialog') === null`), true)
    assert.equal(await evaluate(`document.activeElement === document.querySelectorAll('.course-actions .summary-button')[${i}]`), true)
  }
  for (let i = 0; i < 10; i++) {
    await evaluate(`document.querySelectorAll('.sidebar-summary')[${i}].click(); new Promise(r => setTimeout(r, 30))`)
    assert.ok(await evaluate(`document.querySelector('dialog[open] .reader-section') !== null`))
    await evaluate(`document.querySelector('.reader-close').click(); new Promise(r => setTimeout(r, 30))`)
  }
  await page('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  await evaluate(`document.querySelector('.task-summary').click(); new Promise(r => setTimeout(r, 30))`)
  assert.equal(await evaluate(`document.querySelector('.reader-body').scrollWidth <= document.querySelector('.reader-body').clientWidth + 1`), true)
  await evaluate(`document.querySelector('.reader-toc a[href="#summary-revision"]').click(); new Promise(r => setTimeout(r, 50))`)
  assert.ok(await evaluate(`document.querySelector('.reader-body').scrollTop > 100`))
  await evaluate(`document.querySelector('.reader-close').click(); new Promise(r => setTimeout(r, 30))`)
  assert.equal(await evaluate(`document.body.style.overflow`), '')
  assert.equal(await evaluate(`localStorage.getItem('sap-learning-tracker-weeks')`), saved)
  assert.equal(await evaluate(`document.querySelector('.task-list input').checked`), true)
  assert.deepEqual(exceptions, [])
  console.log('PASS: all weekly and priority summary buttons, 9 guides, answer reveal, Escape/close, focus restoration, mobile layout, chapter navigation, and preserved progress.')
  await send('Browser.close')
} finally {
  socket?.close()
  if (browser.exitCode === null) {
    browser.kill()
    await Promise.race([once(browser, 'exit'), new Promise(resolve => setTimeout(resolve, 3000))])
  }
  await server.close()
}
