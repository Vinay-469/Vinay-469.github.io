# Vinay Kumar Kambala — Portfolio

An Angular portfolio for Vinay Kumar Kambala, .NET Full Stack Developer. Profile, experience, and project content is based on the supplied resume.

## Requirements

Node.js compatible with Angular 22 and npm.

## Development

```sh
npm install
npm start
```

## Production build

```sh
npm run build
```

Build output: `dist/vinay-portfolio/browser`. Configure the host to serve `index.html` for client-side routes. The included Nginx configuration provides this fallback.

## Docker

```sh
docker build -t vinay-portfolio .
docker run --rm -p 8080:80 vinay-portfolio
```

The downloadable resume is `public/assets/Vinay-Kumar-Kambala-Resume.pdf`. Architecture diagrams are labeled illustrative. No project repositories or public demos were supplied, so none are linked.

## Tests

```sh
npm test
```


