import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const SiteContentContext = createContext();

export const SiteContentProvider = ({ children }) => {
    const [siteContent, setSiteContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                if (!supabase) return;

                const { data, error: sbError } = await supabase.from('site_content').select('*');
                
                if (sbError) {
                    // Fail gracefully if table doesn't exist yet
                    if (sbError.code !== 'PGRST116' && !sbError.message.includes('not found')) {
                        throw sbError;
                    }
                }

                if (data) {
                    const dbMap = {};
                    data.forEach((item) => {
                        dbMap[item.key] = item.value;
                    });

                    // Requirement 3: IMPLEMENT CORRECT REUSE
                    // About SECOND image uses: portfolio_bg
                    const populatedContent = {
                        ...dbMap,
                        about_second_image: dbMap.portfolio_bg,
                    };

                    setSiteContent(populatedContent);
                }
            } catch (err) {
                console.error('Error fetching site content:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return (
        <SiteContentContext.Provider value={{ siteContent, loading, error }}>
            {children}
        </SiteContentContext.Provider>
    );
};
