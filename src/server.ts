import express from 'express';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const app = express();
app.use(express.json());

const PORT = 3017;

const csvFilePath = process.argv[2];
if (!csvFilePath) {
  console.error('CSV file path not provided.');
  process.exit(1);
}
console.log(`Using CSV file: ${csvFilePath}`);

// Function to read CSV file
const readCSV = (filePath: string) => {
  return new Promise<any[]>((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// REST API Endpoints
app.get('/data', async (req, res) => {
  console.log('GET /data endpoint hit');
  try {
    const data = await readCSV(csvFilePath);
    res.json(data);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Failed to read CSV file' });
  }
});

app.get('/data/:id', async (req, res) => {
  console.log(`GET /data/${req.params.id} endpoint hit`);
  try {
    const data = await readCSV(csvFilePath);
    const item = data.find((item) => item.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Failed to read CSV file' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
