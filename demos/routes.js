import BasicInit from "./cases/BasicInit.vue";
import ClientHandler from "./cases/ClientHandler.vue";
import CustomControls from "./cases/CustomControls.vue";
import OpenAPI from "./cases/OpenAPI.vue";
import DropAPI from "./cases/DropAPI.vue";
import Localization from "./cases/Localization.vue";

export const links = [
	["/base/:skin", "Basic usage", BasicInit, "BasicInit"],
	["/client/:skin", "Client side handlers", ClientHandler, "ClientHandler"],
	["/controls/:skin", "With button", CustomControls, "CustomControls"],
	["/api/:skin", "Open API", OpenAPI, "Open API"],
	["/dropzone/:skin", "Drop API", DropAPI, "Drop API"],
	["/locale/:skin", "Localization", Localization, "Localization"],
];
