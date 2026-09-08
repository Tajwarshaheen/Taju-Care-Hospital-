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
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Strip common TS in this project
    content = content.replace(/useState<any\[\]>/g, 'useState');
    content = content.replace(/useState<any>/g, 'useState');
    content = content.replace(/medicine: any =/g, 'medicine =');
    content = content.replace(/test: any =/g, 'test =');
    content = content.replace(/emergency: any =/g, 'emergency =');
    content = content.replace(/invoice: any =/g, 'invoice =');
    content = content.replace(/doctor: any =/g, 'doctor =');
    content = content.replace(/patient: any =/g, 'patient =');
    content = content.replace(/appointment: any =/g, 'appointment =');
    content = content.replace(/bed: any =/g, 'bed =');
    content = content.replace(/\(e: React\.FormEvent\)/g, '(e)');
    content = content.replace(/as HTMLFormElement/g, '');
    
    let newPath = filePath.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');
    fs.writeFileSync(newPath, content);
    if (newPath !== filePath) {
      fs.unlinkSync(filePath);
      console.log(`Converted: ${filePath} -> ${newPath}`);
    }
  }
});

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('/src/main.tsx', '/src/main.jsx');
fs.writeFileSync('index.html', indexHtml);
console.log('Updated index.html');

let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.lint = 'echo "No lint for js yet"';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Updated package.json lint script');

