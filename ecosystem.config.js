module.exports = {
  apps: [
    {
      name: 'nextjs-frontend',
      script: 'npm',
      args: 'run start',
      cwd: '/var/www/frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
