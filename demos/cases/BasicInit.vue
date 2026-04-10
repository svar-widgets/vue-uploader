<script setup>
import { ref } from "vue";
import { Uploader, UploaderList } from "../../src/index";

const data = ref([]);
const data2 = ref([]);

const uploadURL = "http://localhost:3000/data";

function handleUpload(ev) {
	console.log(ev);
}
</script>

<template>
	<div class="demo-box">
		<h4>Uploader with default drop zone</h4>
		<div class="demo">
			<UploaderList v-model:data="data" />
			<Uploader
				:upload-u-r-l="uploadURL"
				v-model:data="data"
				:onupload="handleUpload"
			/>
		</div>

		<h4>Disabled Uploader</h4>
		<div class="demo">
			<UploaderList v-model:data="data2" />
			<Uploader
				disabled
				:upload-u-r-l="uploadURL"
				v-model:data="data2"
				:onupload="handleUpload"
			/>
		</div>
	</div>
</template>
