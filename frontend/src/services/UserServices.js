import api from '../services/services';
import axios from "axios";

const fetchData = async (email) => {
  const PET_LIST_URL = `http://adopet-production.up.railway.app/email/?q=${email}`;
  const petListResponse = await fetch(PET_LIST_URL);
  const petListData = await petListResponse.json();
  return petListData;
};

export default fetchData;
