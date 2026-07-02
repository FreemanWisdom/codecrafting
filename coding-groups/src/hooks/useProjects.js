import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { normalizeProject } from '../utils/publicData';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isActive = true;

        const fetchProjects = async () => {
            if (!isSupabaseConfigured || !supabase) {
                setProjects([]);
                setError('Project data is unavailable right now.');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');

            const { data, error: fetchError } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (!isActive) {
                return;
            }

            if (fetchError) {
                setProjects([]);
                setError(fetchError.message || 'Unable to load projects right now.');
                setLoading(false);
                return;
            }

            setProjects((data || []).map((project, index) => normalizeProject(project, index)));
            setLoading(false);
        };

        fetchProjects();

        return () => {
            isActive = false;
        };
    }, []);

    return { projects, loading, error };
};

export default useProjects;
