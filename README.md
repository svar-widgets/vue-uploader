<div align="center">

# SVAR Vue File Uploader

[![npm](https://img.shields.io/npm/v/@svar-ui/vue-uploader.svg)](https://www.npmjs.com/package/@svar-ui/vue-uploader)
[![License](https://img.shields.io/github/license/svar-widgets/uploader)](https://github.com/svar-widgets/uploader/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/@svar-ui/vue-uploader.svg)](https://www.npmjs.com/package/@svar-ui/vue-uploader)

</div>

A Vue UI component for easy and intuitive file uploading, allowing users to drag and drop files or select them from their device.
See the demos [here](https://docs.svar.dev/vue/core/samples-uploader).

### How to Use

To use the widget, simply import the package and include the component in your Vue file:

```vue
<script setup>
import { ref } from "vue";
import { Uploader, UploaderList } from "@svar-ui/vue-uploader";

const data = ref([]);
const uploadURL = "http://localhost:3000/data";

function handleUpload(ev) {
	console.log(ev);
}
</script>

<template>
	<UploaderList v-model:data="data" />
	<Uploader :uploadURL="uploadURL" v-model:data="data" @upload="handleUpload" />
</template>
```

### How to Modify

Typically, you don't need to modify the code. However, if you wish to do so, follow these steps:

1. Run `yarn` to install dependencies. Note that this project is a monorepo using `yarn` workspaces, so npm will not work
2. Start the project in development mode with `yarn start`

### Run Tests

To run the test:

1. Start the test examples with:
    ```sh
    yarn start:tests
    ```
2. In a separate console, run the end-to-end tests with:
    ```sh
    yarn test:cypress
    ```
