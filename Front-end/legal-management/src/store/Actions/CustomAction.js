const fetchDataSuccess = (data) => ({
    type: 'FETCH_DETAILS_SUCCESS',
    payload: data
});

const fetchDataError = (error) => ({
    type: 'FETCH_DETAILS_ERROR',
    payload: error
});

const updateDataSuccess = (data) => ({
    type: 'UPDATE_DETAILS_SUCCESS',
    payload: data
});

const updateDataError = (error) => ({
    type: 'UPDATE_DETAILS_ERROR',
    payload: error
});

export const SaveDataToStore = (data) => {
    return async (dispatch) => {
        try {
            if (data) {
                await dispatch(fetchDataSuccess(data));
                return Promise.resolve();
            }
        } catch (error) {
            await dispatch(fetchDataError(error));
            return Promise.reject(error);
        }
    };
};
export const UpdateDataToStore = (data) => {
    return async (dispatch) => {
        try {
            await dispatch(updateDataSuccess(data));
            return Promise.resolve();
        } catch (error) {
            await dispatch(updateDataError(error));
            return Promise.reject(error);
        }
    };
};

