module.exports = {
  apps: [
    {
      name: 'nextjs-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/frontend',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
}