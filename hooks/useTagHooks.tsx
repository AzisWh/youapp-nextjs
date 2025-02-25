import { useState } from 'react';

const useTagHooks = (maxTags: number) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    if (tags.length < maxTags && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return { tags, setTags, handleAddTag, handleRemoveTag };
};

export default useTagHooks;
