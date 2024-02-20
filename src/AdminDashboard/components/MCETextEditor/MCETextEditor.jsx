import React, {useState,useRef, useEffect} from 'react' 
import {Editor} from '@tinymce/tinymce-react'

const TextEditor = ({setSpecs, specs}) => {
  const [textEditorContent, setTextEditorContent] = useState(specs)
  const [str, setStr] = useState(specs)

  const editorRef = useRef(null);
 
  const handleEditorChange = () => {
    const editor = editorRef.current;
    const editorContent = editor.getContent();
    setSpecs(editorContent)
  }
  
  useEffect(() => {
    if(str === undefined || str === '')
    setStr(specs)
  }, [specs])
  
  return (
    <div className=' d-flex justify-content-center flex-wrap'>
      <div className="d-flex justify-content-center  w-100">
        <Editor
          apiKey='gi1ihulj6qx0m4exgpsoc4sezgh023q826h5m5un0d8xnwdw'
          onEditorChange={handleEditorChange}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={str || '<p>Enter Product Specification Here</p>'}
          
          init={{
            id: 'textEditor',
            height: 400,
            width: 600,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
              'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
       
    </div>
  )
}

export default TextEditor