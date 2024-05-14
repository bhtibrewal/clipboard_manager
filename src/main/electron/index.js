import { log } from 'console';
import { clipboard, ipcMain } from 'electron';
let watcherId = null,
  previousText = clipboard.readText(),
  previousImage = clipboard.readImage();

clipboard.startWatching = () => {
  if (!watcherId)
    watcherId = setInterval(() => {
      // console.log('uuuu');
      if (isDiffText(previousText, (previousText = clipboard.readText())))
        console.log('changed');
      // if (isDiffImage(previousImage, (previousImage = clipboard.readImage())))
      //   clipboardEmitter.emit('image-changed');
    }, 500);
  return clipboard;
};
clipboard.stopWatching = () => {
  if (watcherId) clearInterval(watcherId);
  watcherId = null;
  return clipboard;
};

function isDiffText(str1, str2) {
  return str2 && str1 !== str2;
}

function isDiffImage(img1, img2) {
  return !img2.isEmpty() && img1.toDataURL() !== img2.toDataURL();
}
ipcMain.handle('getClipboards', async (_) => {
  const take = 16;

  log('getclipboards');
});

module.exports = clipboard;
