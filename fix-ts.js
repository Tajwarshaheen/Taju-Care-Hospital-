import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src', (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove entire interface blocks
    content = content.replace(/interface\s+\w+\s*\{[^}]+\}/g, '');
    
    // Remove : Doctor[] or : any[]
    content = content.replace(/: \w+\[\]/g, '');
    
    fs.writeFileSync(filePath, content);
  }
});
