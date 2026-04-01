const fs = require('fs');

// 1. Возвращаем index.html в чистое состояние
let html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Kakadu: One Family – Официальный сайт</title>
    <link rel="icon" href="favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" crossorigin src="./assets/index-DVNmE8I2.js"></script>
    <link rel="modulepreload" crossorigin href="./assets/prerender-c8efxLcN.js">
    <link rel="stylesheet" crossorigin href="./assets/index-DJu_O_Yu.css">
    
    <script>
      // ФИКС РОУТЕРА ДЛЯ GITHUB PAGES
      // Этот скрипт должен быть ПЕРЕД основным JS
      (function() {
        var path = window.location.pathname;
        if (path.includes('/vpn-site/')) {
          // Если мы на гитхабе, подменяем историю, чтобы роутер не зациклился
          window.history.replaceState(null, '', path.replace('/vpn-site/', '/'));
        }
      })();
    </script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('Rebuilt index.html with router fix');

// 2. В JS файлах возвращаем пути к виду "/assets/" (без точек внутри строк), 
// так как мои предыдущие замены могли сломать логику самого Vue
const jsFiles = ['assets/index-DVNmE8I2.js', 'assets/prerender-c8efxLcN.js'];
jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Возвращаем как было в оригинале, но только для внутренних путей
        content = content.split('"./assets/').join('"/assets/');
        fs.writeFileSync(file, content);
        console.log(`Cleaned up ${file}`);
    }
});
