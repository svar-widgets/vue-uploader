<script setup>
defineOptions({ name: "DemoLocalization" });
import { ref } from "vue";
import { Uploader, UploaderList } from "../../src/index";
import { Segmented, Locale } from "@svar-ui/vue-core";
import { cn } from "@svar-ui/uploader-locales";
import { cn as cnCore } from "@svar-ui/core-locales";

const data = ref([]);

const uploadURL = "http://localhost:3000/data";

const langs = [
	{ id: "en", label: "EN" },
	{ id: "cn", label: "CN" },
];
const lang = ref("en");
</script>

<template>
	<div class="demo-box">
		<div class="bar">
			<Segmented :options="langs" v-model:value="lang" />
		</div>
		<div v-if="lang === 'en'" class="demo">
			<UploaderList v-model:data="data" />
			<Uploader :upload-u-r-l="uploadURL" v-model:data="data" />
		</div>

		<Locale v-if="lang === 'cn'" :words="{ ...cn, ...cnCore }">
			<div class="demo">
				<UploaderList v-model:data="data" />
				<Uploader :upload-u-r-l="uploadURL" v-model:data="data" />
			</div>
		</Locale>
	</div>
</template>

<style scoped>
.demo-box {
	gap: 20px;
	display: flex;
	flex-direction: column;
}
</style>
