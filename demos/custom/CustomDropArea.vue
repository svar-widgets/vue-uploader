<script setup>
import { inject, ref } from "vue";
import { asDirective } from "@svar-ui/lib-vue";
import { apiKey } from "../../src/index";

const api = inject(apiKey);
const log = ref([]);
const node = ref(null);

const vDroparea = asDirective(api.droparea);

const apiSettings = {
	temp: true,
	selected: file => {
		log.value = [...log.value, `adding file: ${file.name}`];
	},
	uploaded: file => {
		log.value = [...log.value, file.url];
	},
	dragEnter: () => node.value.classList.toggle("active"),
	dragLeave: () => node.value.classList.toggle("active"),
};
</script>

<template>
	<div
		class="area"
		:class="{ active: false }"
		ref="node"
		v-droparea="{ ...apiSettings }"
	>
		<slot v-if="$slots.default" />
		<template v-else>
			<div class="block">Drop files here</div>
			<div v-if="log.length" class="block">
				<h4>Results:</h4>
				<pre><template v-for="line in log">{{ line + "\n" }}</template></pre>
			</div>
		</template>
	</div>
</template>

<style scoped>
.area {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 10px;
	border: 1px #785bef;
	border-style: dashed;
	border-radius: 3px;
	background: #eaedf5;
	color: #2c2f3c;
}
.area.active {
	background: #785bef;
	color: #eaedf5;
}
.block pre {
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
