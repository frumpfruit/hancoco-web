const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.join(__dirname, 'public', 'assets', 'images');
const availableImages = new Set(fs.readdirSync(imgDir).filter(f => !fs.statSync(path.join(imgDir, f)).isDirectory()));

const filesToCheck = [];

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json')) {
            filesToCheck.push(fullPath);
        }
    }
}

walkDir(path.join(__dirname, 'src'));
walkDir(path.join(__dirname, 'messages'));

let brokenLinks = [];

filesToCheck.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /\/assets\/images\/[a-zA-Z0-9_.-]+/g;
  const matches = content.match(regex);
  if (matches) {
    matches.forEach(match => {
      const filename = match.replace('/assets/images/', '');
      if (!availableImages.has(filename)) {
        brokenLinks.push({ file, match });
      }
    });
  }
});

console.log("Broken links found:");
console.log(JSON.stringify(brokenLinks, null, 2));
