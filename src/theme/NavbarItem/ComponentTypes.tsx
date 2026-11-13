import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import PaletteSelector from '@site/src/components/PaletteSelector';

function PaletteNavbarItem({mobile}: {mobile?: boolean}) {
  return mobile ? null : <PaletteSelector />;
}

export default {
  ...ComponentTypes,
  'custom-palette': PaletteNavbarItem,
};
