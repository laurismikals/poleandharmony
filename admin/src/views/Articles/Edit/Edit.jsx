import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const Edit = ({ id }) => {
  const [article, setArticle] = useState('<p>Hello from CKEditor 5!</p>');

  return (
    <div>
      {id}
      <CKEditor
        editor={ClassicEditor}
        data={article}
        onChange={(event, editor) => setArticle(editor.getData())}
      />
    </div>
  );
};

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};
