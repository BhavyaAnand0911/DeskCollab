'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { EmojiPicker } from "@/components/emoji-picker";
const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

interface QuillEditorProps {
  initialContent?: string;
  onSave?: (content: string) => Promise<void>;
  title?: string;
  icon?: string;
  bannerUrl?: string;
  onUpdateBanner?: (url: string) => Promise<void>;
  onDeleteBanner?: () => Promise<void>;
  onUpdateIcon?: (icon: string) => Promise<void>;
}

const WorkspacePage: React.FC<QuillEditorProps> = ({
  initialContent,
  onSave,
  title = 'My First File',
  icon = '📄',
  bannerUrl='https://unsplash.com/photos/inside-a-vehicle-looking-at-the-sun-H_2JIcjC5HE',
  onUpdateBanner,
  onDeleteBanner,
  onUpdateIcon
}) => {
  const [quill, setQuill] = useState<any>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [saving, setSaving] = useState(false);
  const [deletingBanner, setDeletingBanner] = useState(false);
  const localStorageKey = 'quill-editor-content';
  const [selectedEmoji, setSelectedEmoji] = React.useState("💼");

  // Creating the quill editor
  const wrapperRef = useCallback((wrapper: any) => {
    if (typeof window !== 'undefined') {
      if (wrapper === null) return;
      wrapper.innerHTML = '';
      const editor = document.createElement('div');
      editor.style.minHeight = '100px';
      wrapper.append(editor);
      import('quill').then(module => {
        const Quill = module.default;
        const q = new Quill(editor, {
          theme: 'snow',
          modules: {
            toolbar: TOOLBAR_OPTIONS,
          },
        });
        setQuill(q);
      });
    }
  }, []);

  useEffect(() => {
    if (quill) {
      try {
        const savedContent = localStorage.getItem(localStorageKey);
        
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          quill.setContents(parsedContent);
        } else if (initialContent) {
          // Fall back to initialContent prop if no localStorage content
          const parsedContent = JSON.parse(initialContent);
          quill.setContents(parsedContent);
        }
      } catch (error) {
        console.error('Failed to parse content:', error);
      }
    }
  }, [quill, initialContent]);

  // Handle text changes and save content
  useEffect(() => {
    if (quill === null) return;
    
    const quillHandler = async () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      setSaving(true);
      
      saveTimerRef.current = setTimeout(async () => {
        const contents = quill.getContents();
        const quillLength = quill.getLength();
        
        if (contents && quillLength > 1) {
          // Save to localStorage for persistence
          const contentString = JSON.stringify(contents);
          localStorage.setItem(localStorageKey, contentString);
          
          if (onSave) {
            try {
              await onSave(contentString);
            } catch (error) {
              console.error('Failed to save content:', error);
            }
          }
        }
        setSaving(false);
      }, 850);
    };
    
    quill.on('text-change', quillHandler);
    
    return () => {
      quill.off('text-change', quillHandler);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [quill, onSave]);

  const handleDeleteBanner = async () => {
    if (onDeleteBanner) {
      setDeletingBanner(true);
      try {
        await onDeleteBanner();
      } catch (error) {
        console.error('Failed to delete banner:', error);
      }
      setDeletingBanner(false);
    }
  };

  const handleIconChange = (newIcon: string) => {
    if (onUpdateIcon) {
      onUpdateIcon(newIcon);
    }
  };

  return (
    <div className='min-h-screen'>
      <div className="relative">
        <div className="flex justify-end p-2">
          <div className="flex items-center">
            <span 
              className={`px-2 py-1 rounded text-sm text-white ${saving ? 'bg-orange-600' : 'bg-emerald-600'}`}
            >
              {saving ? 'Saving...' : 'Saved'}
            </span>
          </div>
        </div>
      </div>

      {bannerUrl && (
        <div className="relative w-full h-[200px]">
          <Image
            src="/illustrations/banner.png"
            fill
            className="w-full md:h-48 h-20 object-cover"
            alt="Banner Image"
          />
        </div>
      )}

      <div className="flex justify-center items-center flex-col mt-2 relative">
        <div className="w-full self-center max-w-[800px] flex flex-col px-7 lg:my-8">
          <div className="text-[80px]">
              <div className="m-5 text-4xl ">
                    <EmojiPicker getValue={setSelectedEmoji}>
                      {selectedEmoji}
                    </EmojiPicker>
                  </div>
          </div>  

          <span className="text-white-700 font-handwriting text-3xl font-bold h-9">
            {title}
          </span>
        </div>
        <div
          id="container"
          className="max-w-[800px] w-full"
          ref={wrapperRef}
        >
          {/* Quill editor will be injected here */}
        </div>
        
        {/* Added spacer to increase the overall editor area */}
        <div className="h-40"></div>
      </div>
    </div>
  );
};

export default WorkspacePage;