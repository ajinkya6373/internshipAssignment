
const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                users: action.payload,
            }
        case "DELETE_USER":
            return {
                users: state.users.filter((i) => i.id !== action.payload)

            }
        case "UPDATE":
            let Finduser = state.users.find((i) => i.id === action.payload.id)
            const { id, name, email, phone, website, ...other } = Finduser;
            let updateduser = { ...other, ...action.payload }

            let newList = [];
            state.users.map((i) => {
                if (i.id === action.payload.id) {
                    newList.push(updateduser)
                }
                else {
                    newList.push(i);
                }
                return newList;
            })
            return {
                users: newList
            }
        case "LOG_OUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,

            }
        case "UPDATE_PROFILE":
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePicture: action.payload,
                }
            }
        case "UPDATE_COVERPIC":
            return {
                ...state,
                user: {
                    ...state.user,
                    coverPicture: action.payload,
                }
            }
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]

                }
            }
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter((following) => following !== action.payload)
                }
            }
        case "USERS_POSTS":
            return {
                ...state,
                post: action.payload
            }
        case "DELETE_POST":
            return {
                ...state,
                post: state.post.filter((i) => i._id !== action.payload._id)
            }


        default:
            return state;
    }
}

export default userReducer;