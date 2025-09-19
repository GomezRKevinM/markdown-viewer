const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile("index.html");
});

ipcMain.handle("select-md", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [{ name: "Markdown", extensions: ["md"] }]
  });

  if (result.canceled) return { canceled: true };

  const filePath = result.filePaths[0];
  const content = fs.readFileSync(filePath, "utf-8");

  return { canceled: false, filePath, content };
});
