<script setup>
import { ref } from "vue";
import { Button } from "@svar-ui/vue-core";
import { Uploader, UploaderList } from "../../src/index";
import { getData } from "../data";

const { data: initialData } = getData();
const data = ref(initialData);

const uploadURL = "http://localhost:3000/data";
</script>

<template>
	<div class="demo-box">
		<h4>Uploader with custom controls</h4>
		<div class="demo">
			<Uploader v-model:data="data" :upload-u-r-l="uploadURL">
				<template #default="{ open }">
					<Button type="primary" :onclick="open">Upload files</Button>
				</template>
			</Uploader>
			<UploaderList v-model:data="data" />
		</div>
	</div>
</template>
