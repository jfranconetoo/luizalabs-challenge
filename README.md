<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">LUIZALABS-CHALLENGE</h1>
</p>
<p align="center">
  <img src="https://img.shields.io/github/license/jfranconetoo/luizalabs-challenge?style=flat&color=0080ff" alt="license">
  <img src="https://img.shields.io/github/last-commit/jfranconetoo/luizalabs-challenge?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
  <img src="https://img.shields.io/github/languages/top/jfranconetoo/luizalabs-challenge?style=flat&color=0080ff" alt="repo-top-language">
  <img src="https://img.shields.io/github/languages/count/jfranconetoo/luizalabs-challenge?style=flat&color=0080ff" alt="repo-language-count">
</p>

<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=MongoDB&logoColor=white" alt="MongoDB">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 📍 About

This project is a response to a challenge presented by LuizaLabs. It demonstrates data processing and summarization functionalities.

---

## 📦 Features

-   Process file and save content on database
-   List Orders summarized in a normalize form.

---

## 📂 Project Structure

```sh
└── luizalabs-challenge/
    ├── Dockerfile
    ├── LICENSE
    ├── compose.yaml
    ├── eslint.config.mjs
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── application
    │   │   └── facades
    │   │       ├── dtos
    │   │       │   └── order-summary-filters.dto.ts
    │   │       ├── interfaces
    │   │       │   └── order-facade.spec.ts
    │   │       │   └── order-facade.ts
    │   │       └── order.facade.ts
    │   ├── cluster.ts
    │   ├── domain
    │   │   ├── entities
    │   │   │   ├── order-summary.ts
    │   │   │   └── order.entity.ts
    │   │   ├── exceptions
    │   │   │   └── custom.exception.ts
    │   │   ├── interfaces
    │   │   │   ├── order-repository.interface.ts
    │   │   │   └── order.interface.ts
    │   │   └── usecases
    │   │       ├── get-summary-orders
    │   │       │   └── get-summary-orders.usecase.spec.ts
    │   │       │   └── get-summary-orders.usecase.ts
    │   │       └── process-file-and-batch-insert
    │   │           └── process-file-and-batch-insert.usecase.spec.ts
    │   │           └── process-file-and-batch-insert.usecase.ts
    │   ├── infrastructure
    │   │   └── nestjs
    │   │       ├── app.constants.ts
    │   │       ├── app.controller.ts
    │   │       ├── app.module.ts
    │   │       ├── config
    │   │       │   └── config-modules.ts
    │   │       └── order
    │   │           ├── dtos
    │   │           ├── entities
    │   │           ├── order.controller.ts
    │   │           ├── order.module.ts
    │   │           └── order.repository.ts
    │   └── main.ts
    ├── tsconfig.build.json
    └── tsconfig.json
```

## 🚀 Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

-   **Docker**: `version 25.0.3`
-   **Docker Compose**

### :whale: Running by Docker Compose

Use the following command to run luizalabs-challenge by Docker Compose:

```sh
docker compose up -d
```

### ⚙️ Installation

1. Clone the luizalabs-challenge repository:

```sh
git clone https://github.com/jfranconetoo/luizalabs-challenge
```

2. Change to the project directory:

```sh
cd luizalabs-challenge
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running luizalabs-challenge

Use the following command to run luizalabs-challenge:

```sh
npm run build && node dist/main.js
```

:warning: **If you aren't running by docker compose**: Mongodb must be running!

[OpenAPI Specification](https://github.com/jfranconetoo/luizalabs-challenge/blob/main/src/docs/openapi.yaml)

### 🧪 Tests

To execute tests, run:

```sh
npm test
```

## ✨ Design Choices and Potential Enhancements

The solution prioritizes performance and adheres to SOLID principles by:

-   Processing data in a deserialized and denormalized format.
-   Employing batch saving to the database.
-   Separating data processing logic from data access logic.
-   Using interfaces for repositories and usecases.

These choices offer benefits such as:

-   Data ingestion through stream processing.
-   Faster retrieval times due to pre-processed, denormalized data storage.

**Further optimization ideas include:**

-   Utilizing child processes or worker threads for concurrent batch processing.
-   Exploring message brokers for distributed processing.
