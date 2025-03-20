
import SidebarContainer from "./sidebar/SidebarContainer";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  return <SidebarContainer className={className} />;
};

export default Sidebar;
