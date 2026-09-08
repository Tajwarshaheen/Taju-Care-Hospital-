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
    if (content.includes('catch (err: any)')) {
      content = content.replace(/catch \(err: any\)/g, 'catch (err)');
      fs.writeFileSync(filePath, content);
      console.log(`Fixed catch block in ${filePath}`);
    }
    if (content.includes('catch (error: any)')) {
      content = content.replace(/catch \(error: any\)/g, 'catch (error)');
      fs.writeFileSync(filePath, content);
      console.log(`Fixed catch block in ${filePath}`);
    }
  }
});
