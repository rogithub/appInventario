To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

To webpack:
```sh
bun run build:webpack
```

open http://localhost:3000

To deploy
```sh
scp static/index.html negrita.ro:/var/www/html/app/
scp static/sw.js negrita.ro:/var/www/html/app/
scp -r static/app negrita.ro:/var/www/html/app/static
scp -r static/css negrita.ro:/var/www/html/app/static
scp -r static/img negrita.ro:/var/www/html/app/static
scp -r  static/js negrita.ro:/var/www/html/app/static
scp -r static/lib negrita.ro:/var/www/html/app/static
```