/**
 * @description Extensions can run scripts that read and modify the content of a page. These are called content scripts.
 * They live in an isolated world, meaning they can make changes to their JavaScript environment without conflicting
 * with their host page or other extensions' content scripts.
 *
 * @see https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-on-every-tab#step-3
 */

import { modalHelperInjection } from '../tricks/custom-field-reveal/modal-helper-injection';

const onload = async () => {
  await modalHelperInjection();
};

document.body.onload = onload;
