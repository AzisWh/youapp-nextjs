import { useState, ChangeEvent } from 'react';

interface TagProps {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
}

export const TagField = ({ tags, addTag, removeTag, maxTags }: TagProps) => {
  const [userInput, setUserInput] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    // console.log('User Input:', e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); //Prevent form  new line creation

      if (
        userInput.trim() !== '' &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput(''); //clear input after adding tags
      }
    }
  };
  return (
    <div className="relative w-full">
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? 'Add a tag'
            : `You can only enter max. of ${maxTags} tags`
        }
        className="bg-[#1F4247]/50 text-white text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-[51px] p-2.5 pr-10"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      {/* ===== Render the tags here ===== */}

      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2">
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}>
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
