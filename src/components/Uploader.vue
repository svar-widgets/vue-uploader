<script setup>
defineOptions({ name: "UploaderUploader" });

import { ref, onMounted, provide, inject } from "vue";
import { locale, uid } from "@svar-ui/lib-dom";
import { asDirective } from "@svar-ui/lib-vue";
import { apiKey } from "../helpers/consts";
import { en } from "@svar-ui/uploader-locales";

const data = defineModel("data", { default: () => [] });
const ready = defineModel("ready", { default: () => new Promise(() => ({})) });

const props = defineProps({
	accept: { default: "" },
	multiple: { type: Boolean, default: true },
	folder: { type: Boolean, default: false },
	uploadURL: { default: "" },
	apiOnly: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false },
	onchange: { type: Function },
	onupload: { type: Function },
});

const input = ref(null);
const drag = ref(undefined);
let count = 0;
let lastCtx = {};

// set locale
let l = inject("wx-i18n", null);
if (!l) {
	l = locale(en);
	provide("wx-i18n", l);
}
const _ = inject("wx-i18n", l).getGroup("uploader");

const droparea = (node, ctx) => {
	if (props.disabled) return;

	ctx = ctx || {};
	node.addEventListener("dragenter", () => {
		if (ctx.dragEnter) ctx.dragEnter();
		dragenter();
	});
	node.addEventListener("dragleave", () => {
		if (ctx.dragEnter) ctx.dragLeave();
		dragleave();
	});

	node.addEventListener("dragover", ev => ev.preventDefault(), true);
	node.addEventListener(
		"drop",
		ev => {
			ev.preventDefault();
			lastCtx = ctx;
			drop(ev);
			if (ctx.dragEnter) ctx.dragLeave();
		},
		true
	);
};

const vDroparea = asDirective(droparea);

onMounted(() => {
	input.value.webkitdirectory = props.folder;
});

function add(ev) {
	const files = Array.from(ev.target.files);
	files.forEach(f => addFile(f));
}

function drop(ev) {
	const items = Array.from(ev.dataTransfer.items);

	items.forEach(item => {
		const entry = item.webkitGetAsEntry();
		if (entry) flatten(entry);
	});

	drag.value = false;
	count = 0;
}

function flatten(item, path) {
	path = path || "";
	if (item.isFile) {
		item.file(file => {
			addFile(file);
		});
	} else if (item.isDirectory) {
		const dir = item.createReader();
		dir.readEntries(files => {
			files.forEach(file => {
				flatten(file, path + file.name + "/");
			});
		});
	}
}

function addFile(file) {
	const obj = {
		...lastCtx,
		id: uid(),
		status: "client",
		name: file.name,
		file,
	};

	if (obj.selected) obj.selected(obj);
	props.onchange && props.onchange(obj);

	if (props.multiple) {
		data.value = [...data.value, obj];
	} else {
		data.value = [obj];
	}

	upload(obj);
	input.value.value = "";
}

function defaultUploader(obj) {
	const formData = new FormData();
	formData.append("upload", obj.file);

	const config = {
		method: "POST",
		body: formData,
	};

	return fetch(props.uploadURL, config)
		.then(res => res.json())
		.then(
			d => ({ id: obj.id, ...d }),
			() => ({ id: obj.id, status: "error" })
		)
		.catch(error => console.log(error));
}

function upload(obj) {
	if (!obj) return;

	const request =
		typeof props.uploadURL === "function"
			? props.uploadURL(obj)
			: defaultUploader(obj);

	ready.value = request
		.then(r => {
			r.status = r.status || "server";
			updateData(obj.id, r);
		})
		.catch(error => {
			updateData(obj.id, { status: "error", error });
		});
}

// returns client if any file is being uploaded
// returns error if any file has failed and no file is being uploaded
// returns server if all files have been uploaded
function getState() {
	let status = "server";
	for (let i = 0; i < data.value.length; i++) {
		if (data.value[i].status === "client") return "client";
		if (data.value[i].status === "error") status = "error";
	}

	return status;
}

function updateData(id, result) {
	const ind = data.value.findIndex(i => i.id == id);
	const file = (data.value[ind] = { ...data.value[ind], ...result });

	const res = { ...file, status: getState() };
	if (file && file.uploaded) file.uploaded(res);
	props.onupload && props.onupload(res);

	if (file.temp) data.value = data.value.filter(i => i.id != id);
}

function dragenter() {
	if (count === 0) drag.value = true;
	count++;
}

function dragleave() {
	count--;
	if (count === 0) drag.value = false;
}

function open(ctx) {
	lastCtx = ctx || {};
	input.value.click();
}

provide(apiKey, { open, getState, droparea });
defineExpose({ open, getState, droparea });
</script>

<template>
	<template v-if="apiOnly">
		<input
			type="file"
			class="input"
			ref="input"
			:onchange="add"
			:accept="props.accept"
			:multiple="props.multiple"
			:disabled="props.disabled"
		/>
		<slot />
	</template>
	<div
		v-else
		class="label"
		:class="{ active: drag, 'wx-disabled': props.disabled }"
		v-droparea
	>
		<input
			type="file"
			class="input"
			ref="input"
			:onchange="add"
			:accept="props.accept"
			:multiple="props.multiple"
			:disabled="props.disabled"
		/>
		<slot v-if="$slots.default" :open="open" />
		<div v-else class="dropzone">
			<span>
				{{ _("Drop files here or") }}
				<span class="action" :onclick="open">{{
					_("select files")
				}}</span>
			</span>
		</div>
	</div>
</template>

<style scoped>
.label {
	display: flex;
	align-items: center;
}

.label.active:not(.wx-disabled) .dropzone {
	background-color: var(--wx-background-alt);
}
.input {
	position: absolute;
	width: 0;
	height: 0;
	opacity: 0;
}

.dropzone {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--wx-padding);
	border: var(--wx-input-border);
	border-style: dashed;
	border-radius: var(--wx-input-border-radius);
	background: var(--wx-uploader-background);
}
.label:not(.wx-disabled) .action {
	cursor: pointer;
	color: var(--wx-color-link);
	text-decoration: underline;
}

.label.wx-disabled .dropzone {
	background: var(--wx-color-disabled);
	color: var(--wx-color-font-disabled);
}
</style>
