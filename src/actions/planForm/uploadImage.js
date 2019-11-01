import { uploadImage } from '../../api/local';
import { PLAN_FORM } from './creators';

export function upload(image) {
  return dispatch => {
    uploadImage(image)
      .then(response => response.json())
      .then(data => dispatch(PLAN_FORM.uploadImage(data.imageId)));
  };
}
