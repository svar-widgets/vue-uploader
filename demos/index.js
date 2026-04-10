import { createApp } from 'vue'
import Demos from './common/Index.vue'

import { Globals, Button, Segmented, Locale } from '@svar-ui/vue-core';
import { Willow, WillowDark} from "../src/index.js";
import "@wx/vue-core/style.css";

import { router } from "./common/helpers.js";

const skins = [
  { id: 'willow', label: 'Willow', component: Willow },
  { id: 'willow-dark', label: 'Dark', component: WillowDark },
];

const app = createApp(Demos, {
  publicName: "Uploader",
  skins,
  productTag: "uploader",
  productLink: "core",
  Globals,
  Button,
  Segmented,
  Locale,
});
app.use(router);
app.mount('#app');
