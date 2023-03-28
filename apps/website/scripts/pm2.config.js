module.exports = {
  apps: [
    {
      name: 'retro-avatar-website',
      script: 'npm',
      args: 'run start',
      autorestart: true,
      env: {
        PORT: 3033,
        NODE_ENV: 'production'
      }
    }
  ]
}
