# Tech Stack and Setup

## Base original

Fork de `amilich/isometric-city`.

Stack esperada:
- Next.js;
- React;
- TypeScript;
- Tailwind;
- Canvas 2D;
- estado via React Context;
- build web estático;
- empacotamento desktop via Tauri.

## Desenvolvimento no Raspberry Pi 5

O Pi 5 será usado para desenvolvimento, edição, agente de IA e builds web. O build macOS final deve ser feito no Mac.

### Pacotes base Debian/Raspberry Pi OS 64-bit

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

### Node.js recomendado via nvm

Evite depender do Node do apt se ele estiver velho.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
node -v
npm -v
```

### Rust/Tauri

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustc --version
cargo --version
```

### Aider com OpenRouter

```bash
python -m pip install aider-install --break-system-packages
~/.local/bin/aider-install
export OPENROUTER_API_KEY="COLE_SUA_KEY_AQUI"
```

Ou adicione ao `~/.bashrc`:

```bash
export OPENROUTER_API_KEY="COLE_SUA_KEY_AQUI"
```

### Higgsfield CLI

```bash
npm install -g @higgsfield/cli
higgsfield auth login
npx skills add higgsfield-ai/skills
```

## Comandos do projeto

```bash
git clone https://github.com/SEU_USUARIO/isometric-city.git o-prefeito
cd o-prefeito
npm install
npm run build
npm run dev
```

## Build macOS

O build `.app`/`.dmg` deve ser feito no Mac, não no Pi.

No Mac:

```bash
cd o-prefeito
npm install
npm run build
npm run tauri dev
npm run tauri build
```
