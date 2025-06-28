import { TocMobile as mobile } from './toc/toc-mobile';
import { TocDesktop as desktop } from './toc/toc-desktop';

const desktopMode = matchMedia('(min-width: 1200px)');

function refresh(e) {
  if (e.matches) {
    if (mobile.popupOpened) {
      mobile.hidePopup();
    }

    desktop.refresh();
  } else {
    mobile.refresh();
  }
}

function init() {
  console.log('TOC: init called');
  
  const tocArticle = document.querySelector('main>article[data-toc="true"]');
  console.log('TOC: article with data-toc="true" found:', !!tocArticle);
  
  if (tocArticle === null) {
    console.log('TOC: No TOC article found, exiting');
    return;
  }

  console.log('TOC: Desktop mode matches:', desktopMode.matches);
  
  // Avoid create multiple instances of Tocbot. Ref: <https://github.com/tscanlin/tocbot/issues/203>
  if (desktopMode.matches) {
    console.log('TOC: Initializing desktop mode');
    desktop.init();
  } else {
    console.log('TOC: Initializing mobile mode');
    mobile.init();
  }

  const $tocWrapper = document.getElementById('toc-wrapper');
  console.log('TOC: toc-wrapper found:', !!$tocWrapper);
  
  if ($tocWrapper) {
    $tocWrapper.classList.remove('invisible');
  }

  desktopMode.onchange = refresh;
}

export { init as initToc };
