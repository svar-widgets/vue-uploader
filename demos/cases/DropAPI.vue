<script setup>
import { ref } from "vue";
import { Uploader } from "../../src/index";
import CustomDropArea from "../custom/CustomDropArea.vue";

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
</script>

<template>
	<div class="demo-box">
		<h4>Uploader API (custom drop zone)</h4>
		<div class="demo">
			<Uploader :api-only="apiOnly" :upload-u-r-l="uploadURL" v-model:data="data">
				<CustomDropArea />
			</Uploader>
		</div>
	</div>
</template>
