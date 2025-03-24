export function modalHelperInjection(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const helpLink = document.querySelectorAll('span[data-nsps-type="field_label"] a.smallgraytextnolink');

    if (Array.from(helpLink).length === 0) {
      reject(new Error('There is not any help link!'));
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
              reject(new Error('There is not modal to inject the trick!'));
              return;
            }

            if (!fieldId) {
              reject(new Error('There is not field id to identify the trick!'));
              return;
            }

            iframeBody.style.background = 'red';
            console.log(fieldId);
            resolve(true);
          };
        },
        false,
      ),
    );
  });
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
