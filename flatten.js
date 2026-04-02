const fs = require('fs');
const path = require('path');

const moveFiles = (srcDir, destDir) => {
    if (!fs.existsSync(srcDir)) return;
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        if (fs.lstatSync(srcPath).isDirectory()) {
            moveFiles(srcPath, destDir);
        } else {
            try {
                fs.renameSync(srcPath, destPath);
            } catch (e) {
                // Если файл уже есть, просто удаляем старый
                fs.unlinkSync(srcPath);
            }
        }
    });
};

// 1. Переносим всё из assets в корень
moveFiles('assets', '.');

// 2. Исправляем index.html на плоские пути
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/src="\.\/assets\//g, 'src="./');
html = html.replace(/href="\.\/assets\//g, 'href="./');
html = html.replace(/src="assets\//g, 'src="./');
html = html.replace(/href="assets\//g, 'href="./');
fs.writeFileSync('index.html', html);

// 3. Исправляем JS файлы
const jsFiles = ['index-DVNmE8I2.js', 'prerender-c8efxLcN.js'];
jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let c = fs.readFileSync(file, 'utf8');
        // Убираем все упоминания подпапок, заставляем искать в корне
        c = c.split('"/assets/').join('"./');
        c = c.split('"/images/').join('"./');
        c = c.split('"/svg/').join('"./');
        fs.writeFileSync(file, c);
    }
});

// 4. Исправляем CSS
if (fs.existsSync('index-DJu_O_Yu.css')) {
    let c = fs.readFileSync('index-DJu_O_Yu.css', 'utf8');
    c = c.split('/assets/').join('./');
    fs.writeFileSync('index-DJu_O_Yu.css', c);
}

console.log('Flattening complete.');
