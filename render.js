const { ipcRenderer } = require("electron");
const { marked } = require("marked");

document.getElementById("openFile").addEventListener("click", async () => {
  const result = await ipcRenderer.invoke("select-md");

  if (!result.canceled) {
    const htmlContent = marked.parse(result.content);
    document.getElementById("preview").innerHTML = htmlContent;
  }
});
