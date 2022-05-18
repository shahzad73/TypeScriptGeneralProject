import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default function CustomTextEditor(props) {

    const hashConfig = {
      trigger: '#',
      separator: ' ',
    }




    const getInitialState = (defaultValue) => {
      if (defaultValue) {
        const blocksFromHtml = htmlToDraft(defaultValue);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
      } else {
        return EditorState.createEmpty();
      }
    };


      const [editorState, setEditorState] = useState(
        () => getInitialState(props.defaultHTML)
      );

      const handleEditorChange = (state) => {
        setEditorState(state);

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
                editorStyle={{ border: "0px solid", height: props.height, padding: "10px" }}               
            /> 
      </div>
    );

}
