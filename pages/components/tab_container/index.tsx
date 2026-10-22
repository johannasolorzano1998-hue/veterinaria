import { useState } from "react";

export type TabPanel = {
  name: string;
  content: React.ReactNode;
};

type Props = {
  tabPanels: Array<TabPanel>;
  style?: React.CSSProperties;
};

function TabContainer({ tabPanels, style }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tab-panel">
      <div className="tab-buttons">
        {tabPanels.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabPanels.map((tab, index) => (
          <div key={index} className={`${activeTab === index ? "active" : "hidden"}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabContainer;
