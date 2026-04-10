import type { DefineComponent } from "vue";

export interface IUploadFile {
	id: string | number;
	status?: "client" | "server" | "error";
	name: string;
	file?: File;
	url?: string;
	[key: string]: any;
}

export interface IUploadResult {
	id: string | number;
	status: "client" | "server" | "error";
	name: string;
	file?: File;
	url?: string;
	error?: any;
	[key: string]: any;
}

export declare const Uploader: DefineComponent<{
	data?: IUploadFile[];
	ready?: Promise<any>;
	accept?: string;
	multiple?: boolean;
	folder?: boolean;
	uploadURL?: string | ((file: IUploadFile) => Promise<IUploadResult>);
	apiOnly?: boolean;
	disabled?: boolean;
	onchange?: (file: IUploadFile) => void;
	onupload?: (result: IUploadResult) => void;
}>;

export declare const UploaderList: DefineComponent<{
	data?: IUploadFile[];
}>;

export declare const apiKey: string;

export declare const Willow: DefineComponent<{
	fonts?: boolean;
}>;

export declare const WillowDark: DefineComponent<{
	fonts?: boolean;
}>;
