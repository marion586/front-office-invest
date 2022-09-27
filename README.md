# Vue 3

Minimalist boilerplate for vue with Store, Routes, Services configuration

## Script install pre configured packages

`yarn install` or `npm install`

## script to start the application

`yarn dev` or `npm run dev`

## Folder structure:

- **assets**: static assets
- **components**: all components in the page
- **composables**: [reusable composition api](https://vuejs.org/guide/reusability/composables.html#conventions-and-best-practices)
- **pages**: all pages
- **routes**: route configuration
- **services**: HTTP interaction
- **store**: store configuration

## Testing (`./src/components/HelloWorld.vue` and `./src/components/HelloWorld.test.vue`)

### Component to be tested

```javascript
<script setup>
import { ref } from "vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h1>Hello {{ name }}</h1>
</template>
```

### Test the component

```javascript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import HelloWorld from "./HelloWorld.vue";

describe("HelloWorld", () => {
  it("Should check name", () => {
    const value = "John";

    const HelloWorldTest = {
      components: { HelloWorld },
      template: `<hello-world name="${value}" />`,
    };

    const helloWorld = mount(HelloWorldTest);

    expect(helloWorld.getComponent(HelloWorld).props()).toEqual({
      name: value,
    });
  });
});
```
