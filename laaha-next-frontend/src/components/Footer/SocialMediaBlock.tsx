"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import './social-media.scss';

type RawSocialMediaItem = {
  id: string;
  title: string;
  url: string;
};

type SocialMediaProps = {
  data: RawSocialMediaItem[];
};

type TransformedItem = {
  id: string;
  title: string;
  url: string;
};

const SocialMediaBlock = ({ data }: SocialMediaProps) => {
  const [socialIcons, setSocialIcons] = useState<TransformedItem[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const transformed = data.map((item) => ({
        id: item?.id,
        title: item?.title,
        url: item?.url,
      }));
      setSocialIcons(transformed);
    }
  }, [data]);

  return (
    <>
      {socialIcons.length > 0 && (
        <div className="social-links flex-[0_0_100%]">
          <ul className="ps-0 list-none inline-flex flex-wrap gap-4">
            {socialIcons.map((item) => (
              <li
                className={`mb-2 social-icons ${item?.title?.trim().toLowerCase().replace(/\s+/g, '-')}`}
                key={item.id}
              >
                <Link
                  className="block w-8 h-8"
                  target="_blank"
                  href={item.url}
                  aria-label={item.title}
                >
                  <span className="sr-only">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SocialMediaBlock;
