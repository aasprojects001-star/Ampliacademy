cat << 'EOF' > postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
EOF
