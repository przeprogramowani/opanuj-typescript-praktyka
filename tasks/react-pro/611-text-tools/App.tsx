import { useState } from 'react';
import { PencilIcon } from 'lucide-react';
import Emojifier from './tools/Emojifier';
import Rewinder from './tools/Rewinder';
import Rainbower from './tools/Rainbower';
import TextProcessor from './TextProcessor';

type ToolType = 'emojify' | 'rewind' | 'rainbow';

export default function App() {
  const [currentTool, setCurrentTool] = useState<ToolType>('emojify');

  const renderTool = (props: { text: string }) => {
    switch (currentTool) {
      case 'emojify':
        return <Emojifier {...props} />;
      case 'rewind':
        return <Rewinder {...props} />;
      case 'rainbow':
        return <Rainbower {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        <PencilIcon className="w-6 h-6" />
        Word Docs Pro+
      </h1>

      <div className="space-x-2 mb-4">
        <button
          onClick={() => setCurrentTool('emojify')}
          className={`px-4 py-2 rounded transition-colors ${
            currentTool === 'emojify'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
          }`}
        >
          Emojifier
        </button>
        <button
          onClick={() => setCurrentTool('rewind')}
          className={`px-4 py-2 rounded transition-colors ${
            currentTool === 'rewind'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
          }`}
        >
          Rewinder
        </button>
        <button
          onClick={() => setCurrentTool('rainbow')}
          className={`px-4 py-2 rounded transition-colors ${
            currentTool === 'rainbow'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
          }`}
        >
          Rainbower
        </button>
      </div>

      <TextProcessor>
        {(props) => (
          <div className="space-y-4">
            <textarea
              value={props.text}
              onChange={(e) => props.setText(e.target.value)}
              className="w-full p-2 rounded h-32 bg-gray-900 text-gray-200 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Wpisz swój tekst..."
            />
            {renderTool(props)}
          </div>
        )}
      </TextProcessor>
    </div>
  );
}
