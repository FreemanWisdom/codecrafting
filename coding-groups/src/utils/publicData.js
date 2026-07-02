export const PROJECT_SKELETON_COUNT = 3;

export const truncateText = (text, maxLength = 110) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

export const clampRating = (value) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
        return 0;
    }

    return Math.min(5, Math.max(0, Math.round(numericValue)));
};

export const normalizeProject = (project, index = 0) => ({
    id: project?.id ?? project?.slug ?? project?.project_url ?? `project-${index}`,
    title: project?.title?.trim() || 'Untitled Project',
    description: project?.description?.trim() || project?.summary?.trim() || 'More details coming soon.',
    image: project?.image_url || project?.image || project?.thumbnail_url || project?.cover_image || '',
    projectUrl: project?.project_url || project?.link || project?.url || '',
    tech_stack: project?.tech_stack || '',
    techStack: String(project?.tech_stack || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    problem: project?.problem?.trim() || '',
    solution: project?.solution?.trim() || '',
    result: project?.result?.trim() || '',
});

export const normalizeReview = (review, index = 0) => ({
    id: review?.id ?? review?.created_at ?? `review-${index}`,
    name: review?.name?.trim() || 'Anonymous',
    message: review?.message?.trim() || '',
    rating: clampRating(review?.rating || 0),
});
