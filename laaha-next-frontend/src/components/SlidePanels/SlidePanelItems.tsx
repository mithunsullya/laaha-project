import { useState } from "react";
import SlidePanel, { SlidePanelProps } from "./SlidePanel";

type SlidePanelItem = SlidePanelProps["item"];

interface SlidePanelItemsProps {
  items: SlidePanelItem[];
}

const SlidePanelItems = ({ items }: SlidePanelItemsProps) => {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  return (
    <div>
      {items?.map((item, index) => (
        <SlidePanel
          key={index}
          item={item}
          index={index}
          activeItem={activeItem}
          setActiveItem={(clickedIndex: number) =>
            setActiveItem((prev) => (prev === clickedIndex ? null : clickedIndex))
          }
        />
      ))}
    </div>
  );
};

export default SlidePanelItems;
