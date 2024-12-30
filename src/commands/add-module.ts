import path from "node:path";
import { Position, Uri, WorkspaceEdit, window, workspace } from "vscode";

export async function addCssModuleCommand(uri: Uri) {
	const filePath = uri.fsPath;
	const fileName = path.basename(filePath).split(".")[0];
	const directory = path.dirname(filePath);

	const cssName = `${fileName}.module.css`;
	const cssModulePath = path.join(directory, cssName);
	const cssModuleUri = Uri.file(cssModulePath);

	const importString = `import styles from "./${cssName}";`;

	const config = workspace.getConfiguration("css-modules-quick-create");

	try {
		if (await workspace.fs.stat(cssModuleUri)) {
			window.showErrorMessage(`CSS Module already exists: ${cssModuleUri.fsPath}`);
			return;
		}

		if (config.get<boolean>("addImport")) {
			await workspace.openTextDocument(uri);
			const edit = new WorkspaceEdit();
			edit.insert(uri, new Position(0, 0), importString);
			await workspace.applyEdit(edit);
		}

		const initialContent = new Uint8Array(Buffer.from(""));
		await workspace.fs.writeFile(cssModuleUri, initialContent);
		const document = await workspace.openTextDocument(cssModuleUri);
		await window.showTextDocument(document);
	} catch (error) {
		window.showErrorMessage(`Failed to create CSS Module: ${error}`);
	}
}
