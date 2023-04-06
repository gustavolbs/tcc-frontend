import { MenuButton } from "./styles";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export const Menu: React.FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <MenuButton>
      <div
        className={`menu-button${isMenuOpen ? " open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
      </div>
    </MenuButton>
  );
};
