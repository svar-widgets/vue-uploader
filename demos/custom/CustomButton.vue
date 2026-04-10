<script setup>
import { ref, inject } from "vue";
import { Button } from "@svar-ui/vue-core";
import { apiKey } from "../../src/index";

const api = inject(apiKey);
const log = ref([]);

function testUpload() {
	api.open({
		selected: file => {
			log.value = [...log.value, `adding file: ${file.name}`];
		},
		uploaded: file => {
			log.value = [...log.value, file.url];
		},
	});
}
</script>

<template>
	<div>
		<Button :onclick="testUpload">Select file</Button>
		<h3>Results:</h3>
		<pre><template v-for="line in log">{{ line + "\n" }}</template></pre>
	</div>
</template>
