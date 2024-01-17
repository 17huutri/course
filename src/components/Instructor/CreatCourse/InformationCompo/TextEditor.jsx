import React from "react";
import { Editor } from "@tinymce/tinymce-react";
function TextEditor({ onChange, value }) {
  const handleEditorChange = (editor) => onChange(editor);
  return (
    <div>
      <Editor
        init={{
          selector: "textarea",
          plugins: "link image textpattern lists ",
        }}
        value={value}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}

export default TextEditor;
