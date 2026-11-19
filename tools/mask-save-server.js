// Server phát triển cho tools/mask-builder.html: phục vụ file tĩnh của repo và nhận PNG mask
// (POST /__save-mask?name=<photo>) rồi ghi vào img/masks/<photo>.png.
// Chạy ở thư mục gốc repo:  node tools/mask-save-server.js   → http://localhost:8766/tools/mask-builder.html
// Chỉ nghe localhost, không dùng cho production.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'img', 'masks');
const PORT = Number(process.env.PORT) || 8766;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'POST' && url.pathname === '/__save-mask') {
    const name = url.searchParams.get('name') || '';
    if (!/^[a-z0-9-]+$/.test(name)) { res.writeHead(400); return res.end('bad name'); }
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      fs.mkdirSync(OUT_DIR, { recursive: true });
      const file = path.join(OUT_DIR, `${name}.png`);
      fs.writeFileSync(file, Buffer.concat(chunks));
      res.writeHead(200); res.end(`saved ${path.relative(ROOT, file)}`);
    });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  const file = path.resolve(ROOT, '.' + rel);
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}).listen(PORT, '127.0.0.1', () => console.log(`mask tools on http://localhost:${PORT}/tools/mask-builder.html`));
