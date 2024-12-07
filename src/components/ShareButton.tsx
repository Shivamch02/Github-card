import React from "react";
import { Share2, Twitter, Download } from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import GlassButton from "./ui/GlassButton";

interface ShareButtonProps {
  cardRef: React.RefObject<HTMLDivElement>;
  username: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ cardRef, username }) => {
  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          quality: 1.0,
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = `${username}-github-card.png`;
        link.href = dataUrl;
        link.click();

        toast.success("Card image downloaded successfully!");
      } catch (err) {
        toast.error("Failed to generate card image");
      }
    }
  };

  const handleTwitterShare = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          quality: 1.0,
          pixelRatio: 2,
        });

        const text = `Check out my GitHub profile card! Created with @_cvam's GitHub Cards ✨\n\n${window.location.origin}?username=${username}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}`;
        window.open(url, "_blank");

        toast.success("Opening Twitter to share your card!");
      } catch (err) {
        toast.error("Failed to share on Twitter");
      }
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <GlassButton
          icon={Twitter}
          onClick={handleTwitterShare}
          className="px-6 py-3"
        >
          Share on Twitter
        </GlassButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <GlassButton
          icon={Download}
          onClick={handleDownload}
          className="px-6 py-3"
        >
          Download Card
        </GlassButton>
      </motion.div>
    </div>
  );
};

export default ShareButton;
