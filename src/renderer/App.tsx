import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { useEffect, useState } from 'react';

export default function App() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getClipboards = async () => {
      const clipboards = await window.electron.ipcRenderer.getClipboards({});
      setContent(clipboards);
    };
    getClipboards();
  }, []);

  if (content.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full space-y-3 opacity-30">
        {/* <img src={clippy} width="50%" alt="no Order" /> */}

        <h2 className="text-2xl font-medium opacity-50">
          No Clipboards yet...
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className='m-4 bg-gray-500'>
        {content?.map((clipboard, index) => {
          const { content, type, id, createdDate, blob, width, height, size } =
            clipboard;
          return (
            <div className=" py-3  bg-neutral-700 px-2 " key={id}>
              <div className="px-5 truncate">
                {blob && width && height && size ? (
                  <img
                    src={URL.createObjectURL(
                      new Blob([new Uint8Array(blob)], { type: 'image/png' }),
                    )}
                    // style={{ height: '200px' }}
                    className="w-full max-h-64 relative"
                    alt={`${width}x${height} ${size}`}
                    title={`${width}x${height} ${size}`}
                  />
                ) : (
                  <div className="flex" title={content ?? ''}>
                    {type === 'palette' && (
                      <div
                        className="w-5 h-5 border border-solid border-black mr-1"
                        style={{ backgroundColor: `#${content}` }}
                      />
                    )}
                    <p className="text-sm">{content}</p>
                  </div>
                )}
                <div className="text-zinc-400 text-xs text-left">
                  {/* {dayjs(createdDate).toNow(true)} */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Header/> */}
      {/* <Sidebar />
      <Content /> */}
    </>
  );
}
