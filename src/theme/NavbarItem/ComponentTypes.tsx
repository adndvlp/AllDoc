import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import PaletteSelector from '@site/src/components/PaletteSelector';
import AreaNavbarItem from '@site/src/components/AreaNavbarItem';

function PaletteNavbarItem({mobile}: {mobile?: boolean}) {
  return mobile ? null : <PaletteSelector />;
}

export default {
  ...ComponentTypes,
  'custom-palette': PaletteNavbarItem,
  'custom-area': AreaNavbarItem,
};
