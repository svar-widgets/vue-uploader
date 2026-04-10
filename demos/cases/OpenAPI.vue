<script setup>
import { ref } from "vue";
import { Button } from "@svar-ui/vue-core";
import { Uploader } from "../../src/index";
import CustomButton from "../custom/CustomButton.vue";

// fake backend
const uploadURL = file => {
	return Promise.resolve({
		...file,
		status: "server",
		url: "http://some.com/files/" + file.id,
	});
};

const apiOnly = true;
const data = ref([]);
const api = ref(null);
</script>

<template>
	<div class="demo-box">
		<h4>Uploader API (used by a custom component)</h4>
		<div class="demo">
			<Uploader :upload-u-r-l="uploadURL" :api-only="apiOnly">
				<CustomButton />
			</Uploader>
		</div>

		<h4>Uploader API (used from the same component)</h4>
		<div class="demo">
			<Uploader
				:multiple="false"
				:upload-u-r-l="uploadURL"
				v-model:data="data"
				ref="api"
				:api-only="apiOnly"
			></Uploader>
			<Button :onclick="() => api.open()">Select file</Button>
			<div>
				<pre v-for="row in data" :key="row.id">{{ JSON.stringify(row) }}</pre>
			</div>
		</div>
	</div>
</template>
