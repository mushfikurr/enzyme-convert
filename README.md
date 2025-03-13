# Enzyme

Enzyme is a universal file converter that runs entirely in your browser using `ffmpeg.wasm`. No uploads, no nonsense. Everything stays local.

Built with Vite, React, and TypeScript.

Live at: [https://enzyme-conv.netlify.app/](https://enzyme-conv.netlify.app/)

![Screenshot of the main page of enzyme, converting an .mkv file to mp4.](https://github.com/user-attachments/assets/0a2e9e91-5e83-4bff-bae4-00393390718a)

## Features

- Runs locally in your browser  
- Supports a wide range of formats with `ffmpeg.wasm`  
- Fast and lightweight  
- Simple and clean UI  

## Tech Stack

- Vite  
- React  
- TypeScript  
- ffmpeg.wasm  
- Dexie.js 

## Installation & Development

### Prerequisites

- Node.js
- pnpm (or npm/yarn)  

### Setup

Clone the repository:  

```sh
git clone https://github.com/yourusername/enzyme.git
cd enzyme
```

Install dependencies:  

```sh
pnpm install
```

Start the development server:  

```sh
pnpm dev
```

Build for production:  

```sh
pnpm build
```

## TODO

- Allow cancellation of conversion  
- Display recent conversions from Dexie  
- Sound effects ???  
- Type all available extensions  

## Contributing

1. Fork the repository  
2. Clone your fork  
   ```sh
   git clone https://github.com/yourusername/enzyme-convert.git
   ```
3. Create a new branch  
   ```sh
   git checkout -b feature/...
   ```
4. Make your changes  
5. Run tests and ensure the app builds  
6. Commit your changes  
   ```sh
   git commit -m "Add feature-name"
   ```
7. Push to your fork  
   ```sh
   git push origin feature-name
   ```
8. Open a pull request  

Before submitting, make sure your code follows the project's style and includes relevant documentation.  

## Issues and Feedback

If you find a bug or have a feature request, open an issue on GitHub.
