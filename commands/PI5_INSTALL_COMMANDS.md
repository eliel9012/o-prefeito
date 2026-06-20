# Comandos para instalar no Pi 5

```bash
sudo apt update
sudo apt install -y \
  git curl wget unzip zip jq \
  build-essential pkg-config \
  python3 python3-pip python3-venv pipx \
  libssl-dev ca-certificates \
  libwebkit2gtk-4.1-dev libgtk-3-dev \
  libayatana-appindicator3-dev librsvg2-dev \
  libsoup-3.0-dev libjavascriptcoregtk-4.1-dev \
  patchelf
```

## Node via nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

## Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

## Aider

```bash
python -m pip install aider-install --break-system-packages
~/.local/bin/aider-install
export OPENROUTER_API_KEY="COLE_SUA_KEY_AQUI"
```

## Higgsfield

```bash
npm install -g @higgsfield/cli
higgsfield auth login
npx skills add higgsfield-ai/skills
```

## Teste do fork

```bash
git clone https://github.com/SEU_USUARIO/o-prefeito.git
cd o-prefeito
npm install
npm run build
npm run dev
```
