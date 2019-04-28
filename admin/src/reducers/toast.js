import uuidv1 from 'uuid/v1'; // eslint-disable-line import/extensions

const NAMESPACE = 'toast';
const CREATE = `${NAMESPACE}/CREATE`;
const DELETE = `${NAMESPACE}/DELETE`;

export const toastCreate = payload => ({ type: CREATE, payload });
export const toastDelete = payload => ({ type: DELETE, payload });

export const TOAST_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
};

const toastGenerate = ({ message, type }) => ({
  message,
  type,
  id: uuidv1(),
});

const initialState = { toasts: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE: {
      const doesMessageExist = !action.payload.isDuplicatesAllowed
        && state.toasts.findIndex(({ message, type }) => (
          type === action.payload.type && message === action.payload.message
        )) !== -1;

      return {
        ...state,
        toasts: doesMessageExist
          ? state.toasts
          : [...state.toasts, toastGenerate(action.payload)],
      };
    }
    case DELETE: {
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload),
      };
    }
    default: return state;
  }
};
