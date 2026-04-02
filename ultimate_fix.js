const fs = require('fs');

const fix = (file) => {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');
    // Заменяем "/assets/" на "./assets/"
    c = c.split('"/assets/').join('"./assets/');
    // Заменяем "/images/" на "./assets/images/"
    c = c.split('"/images/').join('"./assets/images/');
    // Заменяем "/svg/" на "./assets/svg/"
    c = c.split('"/svg/').join('"./assets/svg/');
    fs.writeFileSync(file, c);
    console.log('Fixed ' + file);
};

fix('assets/index-DVNmE8I2.js');
fix('assets/prerender-c8efxLcN.js');

// Создаем 404.html как копию index.html
fs.copyFileSync('index.html', '404.html');
console.log('Created 404.html');
