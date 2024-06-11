/* supabase integration types

Jobs // table: jobs
    id: number
    created_at: string
    jobs_title: string
    job_type: string
    job_area: string

Events // table: events
    id: number
    created_at: string
    name: string
    date: string
    venue_id: number
    is_starred: boolean
    private: boolean
    cancelled: boolean

Comments // table: comments
    id: number
    created_at: string
    content: string
    event_id: number // foreign key to Events

Admins // table: admins
    id: number
    created_at: string
    email: string
    password: string

*/

// Hooks for Admins table
export const useAdmins = () => useQuery({
    queryKey: ['admins'],
    queryFn: () => fromSupabase(supabase.from('admins').select('*')),
});

export const useAdmin = (id) => useQuery({
    queryKey: ['admins', id],
    queryFn: () => fromSupabase(supabase.from('admins').select('*').eq('id', id).single()),
});

export const useAddAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAdmin) => fromSupabase(supabase.from('admins').insert([newAdmin])),
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
        },
    });
};

export const useUpdateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedAdmin) => fromSupabase(supabase.from('admins').update(updatedAdmin).eq('id', updatedAdmin.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
        },
    });
};

export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('admins').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
        },
    });
};