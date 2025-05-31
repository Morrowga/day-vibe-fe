module.exports = {
  apps: [
    {
      name: 'nextjs-frontend',
      script: './node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/frontend',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_URL: 'http://13.229.70.118/api'
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G'
    }
  ]
}