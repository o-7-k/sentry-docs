import React, {useEffect, useState} from 'react';

//
// BANNER CONFIGURATION
// This is a lazy way of doing things but will work until
// we put a more robust solution in place.
//
const SHOW_BANNER = true;
const BANNER_TEXT =
  'Join Sentry engineers as they discuss how to use Profiling to see the exact lines of code or functions causing slowdowns in your application.';
const BANNER_LINK_URL = 'https://bit.ly/profiling-ama-reg-7';
const BANNER_LINK_TEXT = 'Sign up now.';
const OPTIONAL_BANNER_IMAGE = null;

//
// BANNER CODE
// Don't edit unless you need to change how the banner works.
//

const LOCALSTORAGE_NAMESPACE = 'banner-manifest';

const fastHash = (input: string) => {
  let hash = 0;
  if (input.length === 0) {
    return hash;
  }
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

const readOrResetLocalStorage = () => {
  const stored = localStorage.getItem(LOCALSTORAGE_NAMESPACE);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (e) {
    localStorage.removeItem(LOCALSTORAGE_NAMESPACE);
    return null;
  }
};

function Banner({isModule = false}) {
  const [isVisible, setIsVisible] = useState(false);
  const hash = fastHash(`${BANNER_TEXT}:${BANNER_LINK_URL}`).toString();

  const enablebanner = () => {
    setIsVisible(true);
    document.body.classList.add('banner-active');
  };

  useEffect(() => {
    const manifest = readOrResetLocalStorage();
    if (!manifest) {
      enablebanner();
      return;
    }

    if (manifest.indexOf(hash) === -1) {
      enablebanner();
    }
  });

  return SHOW_BANNER
    ? isVisible && (
        <div
          className={['promo-banner', isModule && 'banner-module']
            .filter(Boolean)
            .join(' ')}
        >
          <div className="promo-banner-message">
            {OPTIONAL_BANNER_IMAGE ? <img src={OPTIONAL_BANNER_IMAGE} /> : ''}
            <span>
              {BANNER_TEXT}
              <a href={BANNER_LINK_URL}>{BANNER_LINK_TEXT}</a>
            </span>
          </div>
          <button
            className="promo-banner-dismiss"
            role="button"
            onClick={() => {
              const manifest = readOrResetLocalStorage() || [];
              const payload = JSON.stringify([...manifest, hash]);
              localStorage.setItem(LOCALSTORAGE_NAMESPACE, payload);
              setIsVisible(false);
              document.body.classList.remove('banner-active');
            }}
          >
            ×
          </button>
        </div>
      )
    : null;
}

export default Banner;
