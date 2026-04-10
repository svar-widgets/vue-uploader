<script setup>
import { inject, provide } from "vue";

import { locale } from "@svar-ui/lib-dom";
import { en } from "@svar-ui/uploader-locales";

const data = defineModel("data", { default: () => [] });

// set locale
let l = inject("wx-i18n", null);
if (!l) {
	l = locale(en);
	provide("wx-i18n", l);
}

const _ = l.getGroup("uploader");

const fileSize = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];

function removeAll() {
	data.value = [];
}

function remove(id) {
	data.value = data.value.filter(i => i.id !== id);
}

function formatSize(size) {
	let index = 0;
	while (size > 1024) {
		index++;
		size = size / 1024;
	}
	return Math.round(size * 100) / 100 + " " + _(fileSize[index]);
}
</script>

<template>
	<div v-if="data.length" class="layout">
		<div class="header">
			<i class="icon wxi-close" @click="removeAll"></i>
		</div>
		<div class="list">
			<div v-for="obj in data" :key="obj.id" class="row">
				<div class="file-icon"></div>
				<div class="name">{{ obj.name }}</div>
				<div v-if="obj.file" class="size">
					{{ formatSize(obj.file.size) }}
				</div>
				<div class="controls">
					<template v-if="obj.status === 'client'">
						<i class="icon wxi-spin wxi-loading"></i>
					</template>
					<template v-else-if="obj.status === 'error'">
						<i class="icon wxi-alert"></i>
						<i
							class="icon wxi-close"
							@click="remove(obj.id)"
						></i>
					</template>
					<template v-else-if="!obj.status || obj.status === 'server'">
						<i class="icon wxi-check"></i>
						<i
							class="icon wxi-close"
							@click="remove(obj.id)"
						></i>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.layout {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.header {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: var(--wx-padding);
	border-bottom: var(--wx-border);
}

.list {
	overflow: auto;
}

.row {
	display: flex;
	align-items: center;
	gap: var(--wx-padding);
	padding: var(--wx-padding);
	border-bottom: var(--wx-border);
}

.name {
	flex: 1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--wx-icon-size);
	height: var(--wx-icon-size);
	font-size: var(--wx-icon-size);
	line-height: 1;
	border-radius: var(--wx-border-radius);
	color: var(--wx-icon-color);
	cursor: pointer;
}
.icon:before {
	display: block;
}
.icon:hover {
	background-color: var(--wx-background-hover);
}

.row:hover .wxi-close {
	display: flex;
}
.row:hover .wxi-check,
.row:hover .wxi-alert {
	display: none;
}

.row .wxi-close {
	display: none;
}

.wxi-check,
.wxi-alert {
	display: flex;
}
</style>
