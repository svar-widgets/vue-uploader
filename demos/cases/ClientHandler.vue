<script setup>
import { ref } from "vue";
import { Uploader, UploaderList } from "../../src/index";
import { getData } from "../data";

const { data: initData } = getData();
const data = ref(initData);

function getBase64(file) {
	return new Promise(r => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => r(reader.result);
	});
}

function base64Uploader(f) {
	return getBase64(f.file).then(v => {
		return {
			status: "server",
			url: v,
			file: f.file,
			id: f.id,
			size: f.file.size,
		};
	});
}

function handleUpload(ev) {
	console.log(ev);
}
</script>

<template>
	<div class="demo-box">
		<h4>Uploader with custom handler (no server side)</h4>
		<div class="demo">
			<UploaderList v-model:data="data" />
			<template v-for="obj in data" :key="obj.id">
				<img
					v-if="obj.status === 'server'"
					:src="obj.url"
					alt=""
					style="width: 50px; height: 50px; object-fit: cover"
				/>
			</template>
			<Uploader
				v-model:data="data"
				:upload-u-r-l="base64Uploader"
				:onupload="handleUpload"
			/>
		</div>
	</div>
</template>
