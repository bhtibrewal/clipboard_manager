import { log } from 'console';
import { clipboard, ipcMain } from 'electron';
import { getWindow } from '../util';
import { PrismaClient, Clipboard } from '@prisma/client';
import { prismaClientConfig } from '../constants';

let watcherId = null,
  previousText = clipboard.readText(),
  previousImage = clipboard.readImage();

const prisma = new PrismaClient();
const handleTextChange = async () => {
  const mainWindow = getWindow('MAIN_WINDOW_ID');
  const content = clipboard.readText();

  const re = /^(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  const type = re.test(content) ? 'palette' : 'file';

  if (content.replace(' ', '').length > 0) {
    const clip = await prisma?.clipboard.create({
      data: { content, type },
    });
  }
};

clipboard.startWatching = () => {
  if (!watcherId)
    watcherId = setInterval(() => {
      if (isDiffText(previousText, (previousText = clipboard.readText())))
        handleTextChange();
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
ipcMain.handle('getClipboards', async (_, {star, search}) => {
  const take = 16;

  const clipboards = prisma.clipboard.findMany({
    // take: take * (cursor ? -1 : 1),
    // skip: cursor ? 1 : undefined,
    where: {
      // star,
      content: { contains: search },
      // size: { gt: showImages ? '0' : undefined },
    },
    // cursor: cursor ? { id: cursor } : undefined,
    // orderBy: cursor ? undefined : [{ id: 'desc' }],
  });
  log('getclipboards', clipboard);
});

module.exports = clipboard;
