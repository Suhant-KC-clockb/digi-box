import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

function Editor({ onChange, name, value, className, style }: any) {
  const editorRef = useRef<any>();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  // const { CKEditor, ClassicEditor } = editorRef.current;

  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <div className={cn("text-black", className)} style={style}>
      {editorLoaded ? (
        <CKEditor
          className="ck-editor__editable "
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div className="text-white">Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
