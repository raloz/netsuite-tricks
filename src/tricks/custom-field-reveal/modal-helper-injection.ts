function loadFieldAndHelpModal(
  callback: (inputFieldId: string, inputField: HTMLElement, helpModal: HTMLBodyElement) => void,
) {
  const helpLink = document.querySelectorAll('span[data-nsps-type="label"] a');

  if (Array.from(helpLink).length === 0) {
    return;
  }

  helpLink.forEach((link) =>
    link.addEventListener(
      'click',
      () => {
        const iframeHelpModal = document.querySelector('#fieldhelp_frame') as HTMLObjectElement;

        iframeHelpModal.onload = (event) => {
          const [iframeBody, fieldId] = iframeHelpIsLoaded(event);

          if (!iframeBody) {
            return;
          }

          if (!fieldId) {
            return;
          }
          console.log(fieldId);
          callback(fieldId, document.querySelector(`[name="${fieldId}"]`) as HTMLElement, iframeBody);
        };
      },
      false,
    ),
  );
}

function iframeHelpIsLoaded(event: Event): [iframeBody: HTMLBodyElement | null, fieldId: string | null] {
  const iframe = event.target as HTMLObjectElement;
  if (!iframe) return [null, null];

  try {
    const url = new URL(`https://dummy.com${iframe.getAttribute('src')}`);
    const iframeDocument = iframe.contentDocument;

    return [iframeDocument!.querySelector('body'), url.searchParams.get('f')];
  } catch (err) {
    console.error(err);
    return [null, null];
  }
}

function createTableInformation(inputFieldId: string, inputField: HTMLElement, iframeBody: HTMLBodyElement) {
  const inputFieldContainer = inputField.closest('[data-nsps-type="field_input"]') as HTMLElement;
  const inputFieldType = inputFieldContainer.getAttribute('data-field-type');

  console.log({ inputFieldId, inputFieldType, inputField, inputFieldContainer, iframeBody });
}

export function main() {
  loadFieldAndHelpModal(createTableInformation);
}
