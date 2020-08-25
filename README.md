# CSS Exfil Protection

This is the official repository for the CSS Exfil Protection plugins for Chrome and Firefox.

If reporting bugs please include the steps to replicate.  Useful information includes:
* URL which triggers the error
* Expected result
* Actual result

Information about the plugins and the CSS Exfil attack can be found here:
* [Stealing Data With CSS: Attack and Defense](https://www.mike-gualtieri.com/posts/stealing-data-with-css-attack-and-defense)
* [CSS Exfil Vulnerability Tester](https://www.mike-gualtieri.com/css-exfil-vulnerability-tester)

The plugin was named a Firefox :star2: Featured Extension in April 2019!

[![Firefox Rating](https://img.shields.io/amo/stars/css-exfil-protection.svg?label=Firefox)](https://addons.mozilla.org/en-US/firefox/addon/css-exfil-protection/)
[![Chrome Rating](https://img.shields.io/chrome-web-store/stars/ibeemfhcbbikonfajhamlkdgedmekifo.svg?label=Chrome)](https://chrome.google.com/webstore/detail/css-exfil-protection/ibeemfhcbbikonfajhamlkdgedmekifo)

---

### Release notes
#### Version 1.1.0
Released Aug. 24, 2020
* Big update, which moves the project to a 1.1.0 point release
* For Chrome 85 compatibility: Migrating AJAX xhr requests for cross-domain stylesheets to background.js (behavior in Firefox is unchanged)
* Perform disabled check earlier in execution to prevent any interaction by plugin with websites when disabled
* Firefox bugfix: CSS load blocking styles are applied/removed in a different manner, which avoids breaking default styled input elements
* Style enhancements to popup.html
* NEW user controlled domain settings!  Users can now control scan and sanitize based on a site-by-site basis.  Have a problem with a site?  Disable either scan and/or sanitize and the plugin will avoid interaction with any CSS loaded by the website. Bug reports for site-related problems are still welcome!

#### Version 1.0.17
Released Oct. 15, 2019
* Added a privacy policy due to the new Chrome Addon Store policy
* Integrated polyzen's patch to allow for Firefox addon side-loading (for Arch Linux AUR repository)

#### Version 1.0.16
Released Aug. 7, 2019
* Integrated aelisya's patches to add dark theme support and increased target link security

#### Version 1.0.15
Released Jun. 22, 2019
* Bugfix to remove debug logs in Firefox (reported by unsmell)
* Version bumped for Chrome to keep version parity, but no other edits to Chrome plugin.

#### Version 1.0.14
Released Jun. 17, 2019
* Bugfix to properly scan relative path cross-domain stylesheets includes (issue #14) (reported by Firefox user CStark)
* Bugfix for documents lacking a head section (e.g. when loading a PDF in browser)

#### Version 1.0.12
Released Jan. 4, 2019
* Improved disabled icon state and adding reenabled icon state (incorporates suggestions from B00ze64)

#### Version 1.0.11
Released Nov. 20, 2018
* Bugfix release to allow plugin to sanitize pages loaded within frames/iframes (as reported by D)

#### Version 1.0.10
Released Nov. 19, 2018
* New icons
* Disabled status indicator
* Bugfix to better handle alternative stylesheet sanitation (as reported by NN & Firefox reviewer)
* Chrome plugin to receive timeout checks for cross domain resources (similar to what Firefox has had)
* Master branch reverts for experimental code that was within git but never released

#### Version 1.0.8
Released March 6, 2018
* Bugfix release to improve scanning of cross-domain stylesheets

#### Version 1.0.7
Released March 1, 2018
Integrates several bugfixes which increase performance and provide better sanitization, including:
* Added null check on rules before scanning
* Fix indexOf bug reported by mrjacobbloom
* Integrate earthlng patch

#### Version 1.0.5
Released Feb. 14, 2018
* Added blocking protection for content:url()
* Fix blocking logic bug
* Bugfix to prevent false positive on xmlns='http://

#### Version 1.0.4
Released Feb. 9, 2018
* Added badge support to show block count
* Bugfix for Firefox error triggered in certain cases
* Better handling to ensure cross-domain resources are not scanned more than once per load

#### Version 1.0.2
Released Feb. 7, 2018
* Fixes bug triggered by using alongside certain ad-block plugins (as reported by bied)

#### Version 1.0.1
Released Feb. 6, 2018
* Firefox compatibility improvements across multiple platforms.

#### Version 1.0.0
Released Feb. 6, 2018
* Initial release
