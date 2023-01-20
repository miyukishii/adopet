const fetchAllPets = async () => {
  const PET_LIST_URL = 'http://localhost:3002/pets';
  const petListResponse = await fetch(PET_LIST_URL);
  const petListData = await petListResponse.json();
  return petListData;
};

export {
  fetchAllPets,
};