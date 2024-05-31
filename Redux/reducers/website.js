import { SET_PAGE_OPENED ,SET_PAGE_CLOSED} from '../actions/website';

const initialState = {
  pageOpened: false,
};

const WebsiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_OPENED:
      return {
        ...state,
        pageOpened: true,
      };
      case SET_PAGE_CLOSED:
      return {
        ...state,
        pageOpened: false,
      };
    default:
      return state;
  }
};

export default WebsiteReducer;
