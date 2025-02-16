const imageLoader = ({ src }: { src: string }): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${src}`;
};

export default imageLoader;