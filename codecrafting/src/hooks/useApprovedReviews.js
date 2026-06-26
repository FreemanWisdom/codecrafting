import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { normalizeReview } from '../utils/publicData';

const useApprovedReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isActive = true;

        const fetchReviews = async () => {
            if (!isSupabaseConfigured || !supabase) {
                setReviews([]);
                setError('Review data is unavailable right now.');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');

            const { data, error: fetchError } = await supabase
                .from('reviews')
                .select('*')
                .eq('approved', true)
                .order('created_at', { ascending: false });

            if (!isActive) {
                return;
            }

            if (fetchError) {
                setReviews([]);
                setError(fetchError.message || 'Unable to load reviews right now.');
                setLoading(false);
                return;
            }

            setReviews((data || []).map((review, index) => normalizeReview(review, index)));
            setLoading(false);
        };

        fetchReviews();

        return () => {
            isActive = false;
        };
    }, []);

    return { reviews, loading, error };
};

export default useApprovedReviews;
