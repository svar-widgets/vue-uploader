import type { DefineComponent } from "vue";

export type TID = string | number;

export type TUploaderStatus = "client" | "server" | "error";

// fields of the context passed to open() or to the droparea directive,
// they are copied into every file selected through that call
export interface IUploaderContext {
	// called when a file is selected, before the upload starts
	selected?: (file: IUploaderFile) => void;
	// called when the upload of a file has finished
	uploaded?: (file: IUploaderFile) => void;
	// remove the file from data once it is uploaded
	temp?: boolean;
}

export interface IDropAreaContext extends IUploaderContext {
	dragEnter?: () => void;
	dragLeave?: () => void;
}

// a file in the uploader's `data`, the fields returned by the upload handler
// or the server are merged into it
export interface IUploaderFile extends IUploaderContext {
	id: TID;
	name: string;
	file?: File;
	status?: TUploaderStatus;
	error?: unknown;
	url?: string;
	[key: string]: any;
}

// custom upload handler, used instead of posting the file to an URL
export type TUploadHandler = (
	file: IUploaderFile
) => Promise<Partial<IUploaderFile>>;

// API provided by Uploader through the apiKey context
export interface IUploaderApi {
	open: (ctx?: IUploaderContext) => void;
	getState: () => TUploaderStatus;
	droparea: (node: HTMLElement, ctx?: IDropAreaContext) => void;
}

/** @deprecated use IUploaderFile instead */
export type IUploadFile = IUploaderFile;
/** @deprecated use IUploaderFile instead */
export type IUploadResult = IUploaderFile;

export declare const Uploader: DefineComponent<{
	data?: IUploaderFile[];
	// resolves when the last started upload has finished
	ready?: Promise<void>;
	accept?: string;
	multiple?: boolean;
	folder?: boolean;
	uploadURL?: string | TUploadHandler;
	apiOnly?: boolean;
	disabled?: boolean;
	// a file was selected
	onchange?: (file: IUploaderFile) => void;
	// the upload of a file has finished
	onupload?: (file: IUploaderFile) => void;
}>;

export declare const UploaderList: DefineComponent<{
	data?: IUploaderFile[];
}>;

export declare const apiKey: string;

export declare const Willow: DefineComponent<{
	fonts?: boolean;
}>;

export declare const WillowDark: DefineComponent<{
	fonts?: boolean;
}>;
