import { toast } from 'react-toastify';

const ideaReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'ADD_IDEA':
      toast.success("Your idea added! :)")
      return state;
      case 'ADD_IDEA_ERROR':
      toast.error("There is a problem with adding... :(")
      return state;
    case 'COMMENT_IDEA':
      toast.success("Your comment has been added")
      return state;
      case 'COMMENT_IDEA_ERROR':
      toast.error("There is a problem with a comment... :(")
      return state;
      case 'COMMENT_IDEA_DELETED':
      toast.error(payload)
      return state;
      case 'DELETE_IDEA':
      toast.info("The idea succesfully removed ;)")
      return state;
      case 'DELETE_IDEA_ERROR':
      toast.error("There is a problem with removing this idea... :(")
      return state;
    default:
      return state;
  }
};

export default ideaReducer;
