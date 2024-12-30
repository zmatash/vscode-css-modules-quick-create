// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { addCssModuleCommand } from "./commands/add-module";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log("css-modules-quick-create is now active");

	const disposable = vscode.commands.registerCommand("css-modules-quick-create.addCssModule", addCssModuleCommand);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
