import { IUser } from "../types/user";

const handleFetchError = (response: Response) => {
  if (response.ok) return response.json();
  else Promise.reject(new Error(response.statusText));
};

async function getUsers(params: {
  limit?: number;
  page?: number;
}): Promise<IUser[]> {
  const { page = 0, limit = 5 } = params;
  const url = `https://dummyapi.io/data/v1/user?limit=${limit}&page=${page}`;

  return fetch(url, {
    headers: {
      "app-id": "62066a2f508e80d232ca6a72"
    }
  })
    .then(handleFetchError)
    .then((res) => res.data);
}

async function getUserById(id: string): Promise<IUser> {
  const url = `https://dummyapi.io/data/v1/user/${id}`;

  return fetch(url, {
    headers: {
      "app-id": "62066a2f508e80d232ca6a72"
    }
  }).then(handleFetchError);
}
export { getUsers, getUserById };
