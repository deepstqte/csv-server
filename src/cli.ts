import { exec } from 'child_process';
import path from 'path';
import { SingleBar, Presets } from 'cli-progress';

const args = process.argv.slice(2);
const filePath = args[0];

if (!filePath) {
  console.error('Please provide a CSV file path.');
  process.exit(1);
}

console.log(`Starting server with CSV file: ${filePath}`);

const serverPath = path.resolve(__dirname, 'server.ts');
console.log(`Executing command: npx ts-node ${serverPath} ${filePath}`);

// Initialize progress bar
const progressBar = new SingleBar({
  format: 'CSV Loading |' + '{bar}' + '| {percentage}% || {value}/{total} Chunks',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
}, Presets.shades_classic);

progressBar.start(100, 0);

// Simulate CSV loading progress
let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  progressBar.update(progress);

  if (progress >= 100) {
    clearInterval(interval);
    progressBar.stop();

    // Start the server after the progress bar completes
    exec(`npx ts-node ${serverPath} ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Server output: ${stdout}`);
    });
  }
}, 200); // Adjust the interval time as needed 
