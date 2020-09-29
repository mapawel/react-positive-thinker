import * as Yup from 'yup';

export const schemaAddPost = Yup.object().shape({
  content: Yup.string()
    .min(4, 'too short for a post...')
    .max(220, 'try to write it shorter :)')
    .required('this field is required'),
});

export const schemaAddComment = Yup.object().shape({
  comment: Yup.string()
    .min(4, 'too short for a comment...')
    .max(160, 'try to write it shorter :)')
    .required('this field is required'),
});
