const BASE_URL = 'http://localhost:8000';

interface ApiError extends Error {
  status?: number;
  code?: string;
}

const handleApiError = (error: any): never => {
  const apiError: ApiError = new Error(
    error.message || 'An unexpected error occurred'
  );
  if (error.response) {
    apiError.status = error.response.status;
    apiError.code = error.response.data?.code;
  }
  throw apiError;
};

export const api = {

    // methods that do not involve user profile data

    // get insurance all policies
    // add insurance policies
    // get one insurance policy
    // delete one insurance policy

    // async getPolicies(token: string) {
    //     try {
    //         const response = await fetch(`${BASE_URL}/insurance-policies`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         if (!response.ok) {
    //             const error = await response.json();
    //             throw { response, ...error };
    //         }
    //         return response.json();
    //     } catch (error) {
    //         handleApiError(error);
    //     }
    // },

    // async scrapePolicy(url: string, token: string) {
    //     const response = await fetch(`${BASE_URL}/scrape`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ url })
    //     });
    //     if (!response.ok) throw new Error('Failed to scrape policy');
    //     return response.json();
    // }
}; 