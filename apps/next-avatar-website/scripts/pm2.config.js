module.exports = {
  apps: [
    {
      name: 'next-avatar-website',
      script: 'npm',
      args: 'run start',
      autorestart: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
