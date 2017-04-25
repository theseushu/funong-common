import fileToJSON from './file';

import imagesToJSON from './images';

import lnglatToJSON from './lnglat';

import { embeddedUserToJSON, embeddedShopToJSON, embeddedProductToJSON } from './embedded';

import categoryToJSON from './category';

import speciesToJSON from './species';

import roleToJSON from './role';

import userToJSON from './user';

import certToJSON from './cert';

import shopToJSON from './shop';

import publishToJSON from './publish';

import cartItemToJSON from './cartItem';

import commentToJSON from './comment';

import orderToJSON from './order';

import inquiryToJSON from './inquiry';

import bidToJSON from './bid';

export default (schemas) => ({
  fileToJSON,
  imagesToJSON,
  lnglatToJSON,
  embeddedProductToJSON,
  embeddedShopToJSON,
  embeddedUserToJSON,
  categoryToJSON,
  speciesToJSON,
  roleToJSON,
  userToJSON,
  certToJSON,
  shopToJSON,
  publishToJSON,
  cartItemToJSON: cartItemToJSON(schemas),
  commentToJSON,
  orderToJSON,
  inquiryToJSON,
  bidToJSON,
});
