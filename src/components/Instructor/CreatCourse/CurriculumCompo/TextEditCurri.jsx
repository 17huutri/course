import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
function TextEditCurri({ onChange, value }) {
  const handleEditorChange = (editor) => onChange(editor);
  return (
    <Editor
      init={{
        selector: "textarea",
        plugins: "link image textpattern lists ",
      }}
      onEditorChange={handleEditorChange}
      value={value}
    />
  );
}

export default TextEditCurri;
