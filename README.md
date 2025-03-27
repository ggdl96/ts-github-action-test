# TypeScript GitHub Action Test

## Introduction

This is a simple GitHub Action built with TypeScript for testing and learning
purposes. It demonstrates how to create and use custom GitHub Actions.

## Usage

### Step 1: Add Required Permissions

```yml
permissions:
  contents: read
  id-token: write
```

### Step 2: Add the action to the steps section

```yml
- name: GGDL96GithubAction
   uses: ggdl96/ts-github-action-test@1.0.3
   with:
      message: Hi, this is for test!
```

you can choose the verison of the action, ie:

- @1.0.3
- @1.0.2
- @1.0.1
- ...

## Complete example

```yml
name: Example Workflow

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-action:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v3

      - name: Run TS GitHub Action
        uses: ggdl96/ts-github-action-test@1.0.3
        with:
          message: Hi, this is for test!

      # Example of using the action's outputs (if any)
      - name: Use Action Output
        run: echo "The action produced [output]"
```
