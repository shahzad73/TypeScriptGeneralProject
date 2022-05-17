import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';


export default function CustomTextEditor(props) {


    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

      const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        //setConvertedContent(   convertToHTML( )   );
        const hashConfig = {
            trigger: '#',
            separator: ' ',
          }
    
        const rawContentState = convertToRaw(editorState.getCurrentContent());
     
        const markup = draftToHtml(
          rawContentState, 
          hashConfig, 
          false
        );
        // setConvertedContent(markup)
        props.onChange(  DOMPurify.sanitize(markup)  );
      }
    
    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
      <div>
            <Editor
                wrapperClassName="wrapper"
                editorClassName="editor"
                toolbarClassName="toolbar"
                editorState={editorState}                                                
                onEditorStateChange={handleEditorChange}
                editorStyle={{ border: "0px solid", height: props.height }}
            /> 
      </div>
    );

}
