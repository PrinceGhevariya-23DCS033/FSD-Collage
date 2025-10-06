const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Log Files View</h1>
    <h2>Visit <a href="/logs">/logs</a> to view the logs.</h2>
  `)
})

app.get('/logs', (req, res) => {
  const filePath = path.join(__dirname, 'log.txt')

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err.message)

      if (err.code === 'ENOENT') {
        return res.status(404).send(`
          <h1>Error: Log file not found</h1>
          <p>Please ensure the file <strong>log.txt</strong> exists in the server directory.</p>
          <a href="/">Go back to home</a>
        `)
      }

      return res.status(500).send(`
        <h1>Error: Unable to read log file</h1>
        <p>An unexpected error occurred while accessing the log file.</p>
        <a href="/">Go back to home</a>
      `)
    }

    res.send(`
      <h1>Log File Content</h1>
      <pre>${data}</pre>
      <a href="/">Go back to home</a>
    `)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
