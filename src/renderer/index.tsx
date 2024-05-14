import { createRoot } from 'react-dom/client';
import App from './App';
import { clipboard } from 'electron';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg, 'dfrq');
});
window.electron.ipcRenderer.sendMessage('ipc-example', [
  'ping',
  'another ping',
]);

// window.electron.ipcRenderer.on('clipboardContents', (event, message) => {
//   console.log(event, message);
//   // items = [];
//   // message.forEach((element, index) => {
//   //   items.push({ id: index + 10, name: element });
//   // });
//   // //setSelected(items[0]);
//   // setHovered(items[0]);
//   // document.getElementById("clipHistory").focus();
// });
