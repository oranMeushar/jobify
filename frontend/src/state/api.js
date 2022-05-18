import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000/',
        prepareHeaders: (headers, {getState}) =>{
            const token = getState().auth?.user?.token;
            
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
            }

            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            return headers;
        }
    }),

    endpoints:(build) =>({
        createUser: build.mutation({
            query:(body) =>({
                method:'POST',
                url:'auth/signup',
                body
            })

        }),
        loginUser: build.mutation({
            query:(body) =>({
                method:'POST',
                url:'auth/login',
                body
            })
        }),
        addJob:build.mutation({
            query:(body) =>({
                method:'POST',
                url:'jobs',
                body
            })
        }),
        changeProfile:build.mutation({
            query:(body) =>({
                method:'POST',
                url:'auth/profile', 
                body
            })
        }),
        getAllJobs: build.query({
            query:(body) => `jobs/`   
        }),
        deleteJob:build.mutation({
            query:({id}) =>({
                method:'DELETE',
                url:`jobs/${id}`
            })
        }),
        editJob:build.mutation({
            query:(payload) =>({
                method:'PATCH',
                url:`jobs/${payload.id}`,
                body:payload.body
            })
        }),

    }),

    // keepUnusedDataFor: 60 * 60 //* 1 hour

})

export const {
    useCreateUserMutation,
    useLoginUserMutation,
    useAddJobMutation,
    useChangeProfileMutation,
    useGetAllJobsQuery,
    useDeleteJobMutation,
    useEditJobMutation
} = api;

export default api;




