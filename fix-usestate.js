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
    
    // Remove useState<Doctor[]>
    content = content.replace(/useState<\w+\[\]>/g, 'useState');
    // Remove useState<Doctor>
    content = content.replace(/useState<\w+>/g, 'useState');
    
    fs.writeFileSync(filePath, content);
  }
});
