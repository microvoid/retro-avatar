module.exports = {
  apps: [
    {
      name: 'retro-avatar-website',
      script: 'npm',
      args: 'run start',
      autorestart: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
