import React from 'react';
import socialLinks from '../data/socialLinks';

const SocialIcons = ({
    className = 'social-icons',
    linkClassName = 'social-icon-link',
    size = 20,
    onItemClick,
}) => (
    <div className={className}>
        {socialLinks.map(({ label, href, Icon }) => {
            const iconElement = React.createElement(Icon, {
                size,
                'aria-hidden': true,
                focusable: 'false',
            });

            return (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                    aria-label={label}
                    title={label}
                    onClick={onItemClick}
                >
                    {iconElement}
                </a>
            );
        })}
    </div>
);

export default SocialIcons;
