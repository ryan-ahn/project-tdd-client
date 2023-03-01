/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : meta helmet
 */

import { Helmet } from 'react-helmet-async';

interface TProps {
  title: string;
  description: string;
  keywords: string;
  url?: string;
}

export default function MetaHelmet({
  title,
  description,
  keywords,
  url = 'http://localhost:3000',
}: TProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="" />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
