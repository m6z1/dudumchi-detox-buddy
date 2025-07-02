
import { Button } from "@/components/ui/button";

interface EmojiSelectorProps {
  emojis: string[];
  currentEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiSelector = ({ emojis, currentEmoji, onEmojiSelect }: EmojiSelectorProps) => {
  return (
    <div className="grid grid-cols-5 gap-3 p-4">
      {emojis.map((emoji) => (
        <Button
          key={emoji}
          variant={emoji === currentEmoji ? "default" : "outline"}
          className={`h-16 text-2xl ${
            emoji === currentEmoji 
              ? "bg-orange-400 hover:bg-orange-500 border-orange-500" 
              : "hover:bg-orange-50"
          }`}
          onClick={() => onEmojiSelect(emoji)}
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
};

export default EmojiSelector;
