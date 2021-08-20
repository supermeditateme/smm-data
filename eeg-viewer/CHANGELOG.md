# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Generated by [`auto-changelog`](https://github.com/CookPete/auto-changelog).

## [v2.1.0](https://gitlab.cobrain.io/team/eeg_viewer/compare/v2.0.1...v2.1.0) - 2018-07-22
### Merged
- #100 Can pass children to Studio [`#95`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/95)
- #99 Support for custom fetch function passed as option [`#94`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/94)
- Fix/workers sourcemaps [`#93`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/93)
- Feature/85 async data processing [`#82`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/82)

### Commits
- Geerated demo app code [`9bffb19`](https://gitlab.cobrain.io/team/eeg_viewer/commit/9bffb1991dde15fa61ecf32d765bca75fba2ecc4)
- compile all workers [`21ee204`](https://gitlab.cobrain.io/team/eeg_viewer/commit/21ee204b56904f95e39e357e2542811b4bc1be2d)
- abort invalidated segments [`054ddc8`](https://gitlab.cobrain.io/team/eeg_viewer/commit/054ddc82c62982e49405c91c53b4066ac03f714e)
- Fixed one build warning and added missing dependency [`7f5c128`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7f5c1287f95e424c0d6729e76cf79e8e7aef95d8)
- rollup plugin [`ca94a1f`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ca94a1ff891372218ede99f22b3c07206979b8fa)
- fix recalculateCoordinates while processing derrivedValues [`9fdef8f`](https://gitlab.cobrain.io/team/eeg_viewer/commit/9fdef8fe7647fd28bfd29cdddbea25b7290e4173)
- remove redundant processing aborts [`702c8ea`](https://gitlab.cobrain.io/team/eeg_viewer/commit/702c8ea533028e95f82b1c2f0f2b56f26c621605)
- error handling [`c17af89`](https://gitlab.cobrain.io/team/eeg_viewer/commit/c17af896276e45cb47591f45e807e8461ec2f9ce)
- add worker compilation in bundels [`b25ca36`](https://gitlab.cobrain.io/team/eeg_viewer/commit/b25ca3665c4171695291d6445bb14d0765380e61)
- fix replacement of env variables [`6107f62`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6107f62a9fb04cbaa369ddc63b8df3db8ffa20d2)
- own debounce [`477ad15`](https://gitlab.cobrain.io/team/eeg_viewer/commit/477ad15c5b1debf287773031409669f3110d1bd4)
- workers sourcemaps [`05a9e76`](https://gitlab.cobrain.io/team/eeg_viewer/commit/05a9e765068a532b3e522980b1a82499fe4a5ea0)
- close worker inside instead of outside termination [`ade4c36`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ade4c36b89c43731199175ac4879883d4a8fc14c)
- mark method add as private by name convention [`48f9ef4`](https://gitlab.cobrain.io/team/eeg_viewer/commit/48f9ef4acb56ba14d99f0f11f72f34fcdf35b75b)
- add warning in case of empty raw segment [`f4a336f`](https://gitlab.cobrain.io/team/eeg_viewer/commit/f4a336f5979870589992c340dc4d27e5c364f2e0)
- Removed compilation of workers from &#x60;unbundled&#x60; config. [`b02bdd5`](https://gitlab.cobrain.io/team/eeg_viewer/commit/b02bdd520f23cf451d9fc3886ccaeefb33a095a5)
- use actual store state [`7e11547`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7e1154790400f1f57745a77e49d79336ea4d3c3e)
- fix wrong return [`792cfa6`](https://gitlab.cobrain.io/team/eeg_viewer/commit/792cfa68b3cd13d7352abe9f915b4b79c948ae35)
- comment [`a9d08b8`](https://gitlab.cobrain.io/team/eeg_viewer/commit/a9d08b80df072312b8d26b232db1280c5cf72bc4)
- Added minor release script; webworkers calculations necessitate this. [`dd9622c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/dd9622c939508c5f4997728740200c05494a1b6b)

## [v2.0.1](https://gitlab.cobrain.io/team/eeg_viewer/compare/v2.0.0...v2.0.1) - 2018-06-08
### Merged
- #58 Fixed slow scroll [`#91`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/91)
- Styles fix ruler [`#90`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/90)


## [v2.0.0](https://gitlab.cobrain.io/team/eeg_viewer/compare/v2.0.0-beta.4...v2.0.0) - 2018-06-07
### Merged
- Styles remove private styles [`#89`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/89)
- Cursor add first realization [`#87`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/87)
- Added cache cleanup and Firefox support [`#86`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/86)
- Clean up test file [`#88`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/88)
- Feature/x coord selector [`#85`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/85)
- #94 Simple undo / redo history [`#84`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/84)
- fix tabindex lowercase [`#83`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/83)
- Added style file [`#81`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/81)
- Removed inline color stylein - let consumer app style with css [`#80`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/80)

### Commits
- separate processing from middleware [`444f0ab`](https://gitlab.cobrain.io/team/eeg_viewer/commit/444f0ab0b215678e6ffc2a06aee38575ec18cebc)
- async processing [`5b8912c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/5b8912c0537ecb048d45a025b1acea5820fd2cef)
- return  sync rootReducer processing and use regularReducer in demoApp [`f4c7466`](https://gitlab.cobrain.io/team/eeg_viewer/commit/f4c74662c31fa15be56d87618258f3709dc94831)
- abort map [`1528e6a`](https://gitlab.cobrain.io/team/eeg_viewer/commit/1528e6a9a6e74964d40d9b1ff528200bd49fca43)
- Add selector for xCoord [`361cbe9`](https://gitlab.cobrain.io/team/eeg_viewer/commit/361cbe973a89a292c5be2c2129bdf31f59fb57fb)
- #95 Correct cursor rendering [`0040112`](https://gitlab.cobrain.io/team/eeg_viewer/commit/0040112d420f413bb56f5d116376382f42ad67c8)
- #95 Bug fix [`6de1b82`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6de1b8261b6c29d30fee30d629c2c94c5db7d486)
- #95 add second realization [`676c384`](https://gitlab.cobrain.io/team/eeg_viewer/commit/676c3848914cfe524a6678155c93bc0020adaca3)
- Styles correct annotation borders [`95a7571`](https://gitlab.cobrain.io/team/eeg_viewer/commit/95a7571ebc5b2914a825ebbaa2659f4e5b53e82f)
- xCoord refactoring [`fbabd5f`](https://gitlab.cobrain.io/team/eeg_viewer/commit/fbabd5fb49a93603de88928c2390921300d1e074)
- enable middleware in demoApp [`81e050c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/81e050ca264f7f9f24eda9613f3f6da5dab8e4e3)
- Math.floor to Math.trunc [`75c38c6`](https://gitlab.cobrain.io/team/eeg_viewer/commit/75c38c66d6fe4c541d0929c328c9118a7be02156)
- Styles correct annotation borders [`66d38b0`](https://gitlab.cobrain.io/team/eeg_viewer/commit/66d38b0d0e3c2bc07f208f75a545426ee09dbd8f)
- xCoord Correct props [`972f574`](https://gitlab.cobrain.io/team/eeg_viewer/commit/972f574ffc488a29edfdf0c3a5079ddc68469d70)

## [v2.0.0-beta.4](https://gitlab.cobrain.io/team/eeg_viewer/compare/v2.0.0-beta.3...v2.0.0-beta.4) - 2018-05-28
### Merged
- Do not prevent context menu in development environment. [`#78`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/78)
- #93 Support for hidden annotations and different colors via cssClass field in annotation model [`#77`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/77)


## [v2.0.0-beta.3](https://gitlab.cobrain.io/team/eeg_viewer/compare/v2.0.0-beta.2...v2.0.0-beta.3) - 2018-05-28
### Merged
- Cleanup! [`#76`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/76)
- #82 Refactored data access to use keyed store. Made convenient wrapper. [`#71`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/71)
- #91 Add annotation component [`#74`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/74)
- Fixed NaN warning for width, when edf header is still not available (being loaded) [`#73`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/73)
- #82 Added React&#x27;s new strict mode [`#72`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/72)
- Fixed jumping; removed onBlur behaviour (we need to maintain selection) [`#70`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/70)

### Commits
- #91 Prevent context menu on Mac [`6567eb2`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6567eb2a5db5f384211ba7b11dd5979d955058b1)
- #91 Code review fix - removed unused variable [`087164b`](https://gitlab.cobrain.io/team/eeg_viewer/commit/087164b1cf057a4ef53274862bec4043e2b3a439)
- Quickfix after merge [`2780bf8`](https://gitlab.cobrain.io/team/eeg_viewer/commit/2780bf80be90e2b3e16446f0dab09a3a4f028d8e)

## [v2.0.0-beta.2](https://gitlab.cobrain.io/team/eeg_viewer/compare/v2.0.0-beta.1...v2.0.0-beta.2) - 2018-05-25
### Merged
- Do not fault on edfs without bipolar montage channels [`#69`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/69)
- Unit of measurement is invariably Seconds now. No milliseconds - it led to code… [`#68`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/68)
- Feature/91 delete annotation [`#67`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/67)
- #90 Select annotation, resize with mouse [`#66`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/66)
- Variative ruler [`#65`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/65)
- Clear/plot vertical scrollbar [`#64`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/64)
- keyboard navigation [`#63`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/63)
- Cleanup/common actions refactoring [`#62`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/62)
- Bumped rollup version [`#61`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/61)
- Removed dummy annotations [`#60`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/60)
- #89 Minimap navigation on click [`#59`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/59)
- #88 Simple channels list component with TEMPORARY color selection for channel [`#57`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/57)
- #82 Added guard for navigation, and refactored reducers a bit [`#58`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/58)
- #82 Exposed some actions/methods, in a suboptimal way [`#55`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/55)

### Commits
- Refactored actions to use Symbols as their type; and always have &#x60;payload&#x60; field [`a3b1f20`](https://gitlab.cobrain.io/team/eeg_viewer/commit/a3b1f205ab3e96718ef46d810170066fc51f70ad)
- #91 Delete annotations and jump to next/prev annotation with keyboard [`e0cd869`](https://gitlab.cobrain.io/team/eeg_viewer/commit/e0cd869e6557e59d7ed24755e1deb0d0574efc6f)
- Ruler replace configuration [`26427e1`](https://gitlab.cobrain.io/team/eeg_viewer/commit/26427e1bf9f9ff84c9186d039ff8afff033d66ad)
- Unit of measurement is invariably Seconds now. No milliseconds - it led to code soup that was hard to understand. [`07c9890`](https://gitlab.cobrain.io/team/eeg_viewer/commit/07c9890dfe727076c4be618add628f9d46e4a7d9)
- Add ruler configuration [`2848681`](https://gitlab.cobrain.io/team/eeg_viewer/commit/2848681be4ecb1f2c9710e7d43395adead5ee685)
- #91 Set time softly when jumping annotations, and fixed focus [`594d0cd`](https://gitlab.cobrain.io/team/eeg_viewer/commit/594d0cd961e516ecfb77eb4b59be6de8d877a229)
- #90 Code review fixes [`97d7c5d`](https://gitlab.cobrain.io/team/eeg_viewer/commit/97d7c5dab776b2922836915d7b18ceefbc2d659e)
- #90 Cleaned up [`86854bd`](https://gitlab.cobrain.io/team/eeg_viewer/commit/86854bd3250f2cc54ba52e03d69389fe04cd1cfb)
- Remove vertical scrollbar [`a9c6989`](https://gitlab.cobrain.io/team/eeg_viewer/commit/a9c698993b02a012589fb737a334ed07c62caed4)
- Fixed jumping; removed onBlur behaviour (we need to maintain selection) [`1f1baba`](https://gitlab.cobrain.io/team/eeg_viewer/commit/1f1baba8ab18a753a8d2e735dd38006e097abbf5)
- return old hotkey behavior [`044cf50`](https://gitlab.cobrain.io/team/eeg_viewer/commit/044cf50b44a6c159dc976aad2b594e027b572758)
- Cleaned up more [`03a47a6`](https://gitlab.cobrain.io/team/eeg_viewer/commit/03a47a6f44f68738828efed3867a82690e4039c1)
- Plot clear css styles [`18147d1`](https://gitlab.cobrain.io/team/eeg_viewer/commit/18147d1d7b0707a36e2b8e6ad9f7eed8bc1d92d2)
- #89 Code review fixes [`f38a4e5`](https://gitlab.cobrain.io/team/eeg_viewer/commit/f38a4e50fd92f123c6877a55b4d78ad90173cacc)
- #90 Cleaned up some more [`60bcdc0`](https://gitlab.cobrain.io/team/eeg_viewer/commit/60bcdc027fe267a8c12c8b1ef16c21ddb35b6654)
- Ruler delete unnecessary [`dfdf270`](https://gitlab.cobrain.io/team/eeg_viewer/commit/dfdf27020828b10a8db31c754598c041177e0646)
- do not restrict jump duration by one epoch [`b7ed8a8`](https://gitlab.cobrain.io/team/eeg_viewer/commit/b7ed8a8a0b6d307face9d325c84b44d145c8f3d5)
- Cleaned up redundant variable [`4ec134c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/4ec134cbc722caab71b680cb690c1751e57d51d8)
- #82 Added forgotten import [`ff24f24`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ff24f244c1c4e190b173069659d0b8ae4af0220f)

## [v2.0.0-beta.1](https://gitlab.cobrain.io/team/eeg_viewer/compare/v1.2.1...v2.0.0-beta.1) - 2018-05-21
### Merged
- #82 Build system upgrade, and Studio defaults for integration with consumer apps [`#54`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/54)
- Feature/85 async calculations in studio [`#49`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/49)
- #87 Added css styles missing in last MR [`#53`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/53)
- #85 Implemented montage switch; fixed some bugs [`#51`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/51)
- Feature/87 annotations components [`#52`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/52)
- #86 Plot component [`#50`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/50)
- Modify scrollers [`#48`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/48)
- Modify ruler [`#47`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/47)
- #83 Studio wrapper component [`#46`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/46)
- Native scroll [`#44`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/44)
- #83 Utility selector for obtaining indices of segments that we wish to preload/pre-render [`#45`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/45)
- Add viewport component [`#43`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/43)
- Feature/store separate [`#41`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/41)
- Cleanup on old edf parsing code [`#42`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/42)
- #82 Work on resource loader and cache [`#30`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/30)
- add ruller design [`#39`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/39)
- Delete jquery [`#40`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/40)
- Add reselect [`#38`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/38)
- Prettier rollup config [`#37`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/37)
- Ruler change translate; add currentTime and current Chunk [`#36`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/36)
- Moved files around / refactored a bit [`#35`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/35)
- Revert &quot;Merge branch &#x27;revert-5971897a&#x27; into &#x27;dev&#x27;&quot; [`#34`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/34)
- Restored config files [`#33`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/33)
- Revert &quot;Merge branch &#x27;feature/add-ruller&#x27; into &#x27;dev&#x27;&quot; [`#32`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/32)
- Add ruller [`#31`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/31)
- #82 Basic store for eeg data [`#29`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/29)
- Feature/add store [`#28`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/28)
- tTech/82 eeg studio infra [`#27`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/27)

### Commits
- #82 New folder structure; some packages removed and package versions updated. [`29a0b0d`](https://gitlab.cobrain.io/team/eeg_viewer/commit/29a0b0dd89020c1232b9419ac475af2647db41a5)
- Add native scroll realization [`263f776`](https://gitlab.cobrain.io/team/eeg_viewer/commit/263f776b1cd7ee5efa8489d2b66f8d3c12bc6805)
- Native scroller add Tranform scroller component [`048e4a7`](https://gitlab.cobrain.io/team/eeg_viewer/commit/048e4a74c004885ba82f1301c24eed10f16d1e22)
- Ruller simplify [`aff61c3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/aff61c389e4257868f07766388ea2fd424a85242)
- Scrollers bug fix [`fb2070d`](https://gitlab.cobrain.io/team/eeg_viewer/commit/fb2070d08a3614311bc4d9031ee15ab3a225b344)
- Viewport delete console [`4b65bd0`](https://gitlab.cobrain.io/team/eeg_viewer/commit/4b65bd06eb130e0b907ebe6e357313637a5a286c)
- #add ruller [`2394148`](https://gitlab.cobrain.io/team/eeg_viewer/commit/23941481af7e272bf72a5d4bf65c5454eabc0213)
- Delete fonts and get back index.html [`61dd4f5`](https://gitlab.cobrain.io/team/eeg_viewer/commit/61dd4f5c30ca089dc9aabc75f7b20644dc024480)
- Store with eroros [`7f037d6`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7f037d6650cfc9f2b1d13c9307008d1ce991ca28)
- Add Viewport component [`a1bd797`](https://gitlab.cobrain.io/team/eeg_viewer/commit/a1bd797150087f455937740d4e7327c057020950)
- #85 Sync reducer for calculations [`3083288`](https://gitlab.cobrain.io/team/eeg_viewer/commit/3083288ac2a35a37e6bb99f1ebbf00f1ffe3c9bf)
- Add another actions for save time position [`f75eeb6`](https://gitlab.cobrain.io/team/eeg_viewer/commit/f75eeb67fe5ff8941cd991f53c8ba3c66ac3eaaf)
- #create strore - without errors [`6100cad`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6100cad448d4fbd7764222247848075e111acbe1)
- Modify scrollers and ruler [`e444d3d`](https://gitlab.cobrain.io/team/eeg_viewer/commit/e444d3da16eeae86c8e26caaf268ff954720a27f)
- #82 Build system fixes [`834a969`](https://gitlab.cobrain.io/team/eeg_viewer/commit/834a969f2fdf6e1fc35d13089c8d9bb56053af34)
- #82 Some code cleanup [`d2bf414`](https://gitlab.cobrain.io/team/eeg_viewer/commit/d2bf41468b1d080926acc5e3dacebfe0e85b0929)
- #82 Added eslint packages [`8891362`](https://gitlab.cobrain.io/team/eeg_viewer/commit/88913629f7da2de94470ed92e043ce65c423e24b)
- Scrollers add container for hidding [`e047449`](https://gitlab.cobrain.io/team/eeg_viewer/commit/e047449a71d58f23f742107bbaea893d3079ced7)
- #82 Range loading [`9ffab6a`](https://gitlab.cobrain.io/team/eeg_viewer/commit/9ffab6a4d98368a4a5a80ae144d26f7d609e6376)
- Store separate [`73f7ebb`](https://gitlab.cobrain.io/team/eeg_viewer/commit/73f7ebbb6db69f024f27b42592c63709773c5112)
- Ruller get back scrollers [`18ce827`](https://gitlab.cobrain.io/team/eeg_viewer/commit/18ce82781942e6a0634a0d23256f98b6d4a47d6e)
- Add segment selector [`ba265a4`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ba265a4c6ff68a176c598ac824c381e81a62766e)
- #82 Data fetches on scroll [`6fa181b`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6fa181bf88e2a8d5bf2749a64066653dd0a37e54)
- #87 Annotations component [`4187d5e`](https://gitlab.cobrain.io/team/eeg_viewer/commit/4187d5e446f3a0a1976fb8eb78ddd6902fd6caff)
- #add ruller: rewrite epoch transform [`9db8613`](https://gitlab.cobrain.io/team/eeg_viewer/commit/9db8613c144b9bf51d9766ac1436ed6b85a53a20)
- #87 Simple annotations minimap [`403c7bb`](https://gitlab.cobrain.io/team/eeg_viewer/commit/403c7bb5cd61f791b76f89c6a678ad60fde49997)
- Separate viewer to scroller [`fa62239`](https://gitlab.cobrain.io/team/eeg_viewer/commit/fa62239b9d8bbd9a9e137d5fa336e35f78098bc7)
- Restored build config once again [`62bc890`](https://gitlab.cobrain.io/team/eeg_viewer/commit/62bc8901738515726eab91ff73aeb94c07276be7)
- Ruller fix bugs [`0f40416`](https://gitlab.cobrain.io/team/eeg_viewer/commit/0f404160fc80ca9c25f981f29b79876218b8eadb)
- Scrollers merge dev [`7011840`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7011840e8c8dfcf1a595b23b476d7439f18e1352)
- #85 Example usage [`26595e0`](https://gitlab.cobrain.io/team/eeg_viewer/commit/26595e07b31d7fe75ce3e337c68bb05b24c83e8b)
- Ruller merge with dev [`ca3a919`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ca3a919ee4d6c9b749bab92ff6e8d7504bbaa17f)
- #82 WIP on store [`6d9c94c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6d9c94cdca323425f49b45f8371d8c6a9dcf277e)
- #82 Build system now preserves module structure for ES6 modules build [`bb5dc2f`](https://gitlab.cobrain.io/team/eeg_viewer/commit/bb5dc2fa35f385512f8bda83f84c0e7845331ff5)
- #83 Cleaned up reducers from legacy stuff [`31b8ae3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/31b8ae365ce89e7c6cb0d24a7aca13b4e17fd60e)
- Viewport rename component [`9ff6924`](https://gitlab.cobrain.io/team/eeg_viewer/commit/9ff6924b809060469b2c99360328b722abefc912)
- #87 Code review fixes [`3c5d387`](https://gitlab.cobrain.io/team/eeg_viewer/commit/3c5d3875eb2897e26a19368be569b9e863a6864c)
- Get back Package json [`2e212f5`](https://gitlab.cobrain.io/team/eeg_viewer/commit/2e212f50a8c52a4a14c2755f1a0b0e9e0868bd2e)
- #82 Removed redundant &#x60;break&#x60;s after return statements [`24a4274`](https://gitlab.cobrain.io/team/eeg_viewer/commit/24a4274a29f89dec418efaddca1c0f8e0251a43e)
- #83 Code review fixes [`2d7d1b3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/2d7d1b3708851e3dbdeaa600baecd51badead604)
- Fix ruler index [`0600880`](https://gitlab.cobrain.io/team/eeg_viewer/commit/0600880b44e3e0f073fd0967881ab2241eb42232)
- Fix package.json [`24cd244`](https://gitlab.cobrain.io/team/eeg_viewer/commit/24cd2449c435aeb2e5366450e940be2de75152b0)
- #86 Added selector todo [`b0d5471`](https://gitlab.cobrain.io/team/eeg_viewer/commit/b0d547137188e50058250807e186434dae427910)
- #82 Changes after merge [`b838d2d`](https://gitlab.cobrain.io/team/eeg_viewer/commit/b838d2d5e34e1ba573c83baaa415a5b35b53165b)

## [v1.2.1](https://gitlab.cobrain.io/team/eeg_viewer/compare/v1.2.0...v1.2.1) - 2018-03-29
### Merged
- #81 change data record [`#26`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/26)

### Commits
- #81 change dataRecord to 1 000 000 [`00215c0`](https://gitlab.cobrain.io/team/eeg_viewer/commit/00215c0166292806dfee66cef0ae8c862b09fcef)
- #81 change another comparison [`d0b7754`](https://gitlab.cobrain.io/team/eeg_viewer/commit/d0b77549cd91409a130a1d79647cf288f0509b60)
- #81 change dataRecord to 1 000 000 [`d5cea1f`](https://gitlab.cobrain.io/team/eeg_viewer/commit/d5cea1f47f118b4095f5f3b784c54c7bbdb8bce2)
- Update README.md [`9ceadf8`](https://gitlab.cobrain.io/team/eeg_viewer/commit/9ceadf8ff736456370a00981dc65b2d67eb72ee7)
- Update package.json [`dc7113c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/dc7113c7b8451dfcfe4473bf472716f2c9995c0f)

## [v1.2.0](https://gitlab.cobrain.io/team/eeg_viewer/compare/1.1.24...v1.2.0) - 2017-12-05
### Merged
- #76 Build system rewrite [`#25`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/25)


## [1.1.24](https://gitlab.cobrain.io/team/eeg_viewer/compare/1.1.23...1.1.24) - 2017-11-28
### Merged
- #71 preview speed optimisation [`#24`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/24)

### Commits
- render only visible annotations [`997de5f`](https://gitlab.cobrain.io/team/eeg_viewer/commit/997de5f409e36571e6b76447d7e8e655b83cf671)
- preview cursor separate render [`7545571`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7545571ed5e3bef01e61f93c0c5862d289efd1f1)
- replace functional component wiht PureComponent, delete debbug code and return default file name [`269f252`](https://gitlab.cobrain.io/team/eeg_viewer/commit/269f252d7a30c12a3449bc79d5aa924b561d7647)
- eslint, style fixes [`0724479`](https://gitlab.cobrain.io/team/eeg_viewer/commit/0724479163004f2e6242c7004507ba0f42a25eda)
- Bump version 1.1.24 [`6d694ce`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6d694ceb86a312824a94fe044dbdf588b094277f)
- save annotation if user click on background [`27e7fa3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/27e7fa38cfc6f84562354c06357775daa737a270)
- fix year fixing function [`56a5777`](https://gitlab.cobrain.io/team/eeg_viewer/commit/56a57777cd8fdd8079f229602766f44e219669e2)
- Update Cursor.js [`ceb2aa9`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ceb2aa9ae8371b764251c51318d04662637b8d17)

## 1.1.23 - 2017-11-24
### Merged
- Fix/ee g viewer 70 finish reading corrupted files [`#23`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/23)
- Aydar/quick edit [`#22`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/22)
- #65 Bugfix in create annotation quick edit [`#21`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/21)
- Aydar/share [`#20`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/20)
- #63 Amplitude inversion, annotatation cancel from keyboard [`#19`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/19)
- #60 Various demo features and fixes [`#18`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/18)
- #59 FileEDFResource [`#17`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/17)
- #57, #58 Firefox support and various demo features and fixes [`#16`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/16)
- #56 Fix eeg viewer breaking on annotation loading [`#15`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/15)
- #41 Keep unrecognized columns (header and data) when exporting csv [`#14`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/14)
- #55 Locale support [`#12`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/12)
- #54 Demo features / fixes [`#11`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/11)
- #44 Montage selection in combobox [`#10`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/10)
- #2 Small fixes [`#9`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/9)
- #2 Fixed history for channel toggling [`#8`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/8)
- #2 Channel toggling feature [`#7`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/7)
- #52 Usability fixes [`#6`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/6)
- Fix/ee g viewer 47 various fixes [`#5`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/5)
- #47 Various fixes [`#4`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/4)
- Feat/ee g viewer 45 file partial loading [`#3`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/3)
- EEG_VIEWER-39 Парсеры аннотаций; хэндлер для управления редактором [`#2`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/2)
- EEG_VIEWER-39 Загрузка файлов отделена от просмотрщика [`#1`](https://gitlab.cobrain.io/team/eeg_viewer/merge_requests/1)

### Commits
- Bump version 1.1.23 [`ec51fa6`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ec51fa67eb0fb694a5f52f548c0614785dc41383)
- Visual tweak for better displaying common channel names [`dc2e65b`](https://gitlab.cobrain.io/team/eeg_viewer/commit/dc2e65b757657364157d3fc61cdb5c2d4d118201)
- #70 Finish reading corrupted files [`279ea56`](https://gitlab.cobrain.io/team/eeg_viewer/commit/279ea566595a68688a038540b8e37211b78faa2a)
- don&#x27;t change visual state by history state switching [`cf8c7ec`](https://gitlab.cobrain.io/team/eeg_viewer/commit/cf8c7ec175aef5c6f598d781b3db37576195d80c)
- #67 Style bugfix [`8558c1c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/8558c1cef3875df316eb704bc2c3abf903036b7e)
- #68 Share link with time [`6be8474`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6be8474692a286f6f15dbd5596b570967e32c3b2)
- cache bipolar comp functions and jump on start of selected annotation [`7502b19`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7502b198e3ebcca638314b99c1c7a32b1a458652)
- refactor ugly hash replacement [`a21717c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/a21717cc7c4b22c2744bd2bceba47b50fd93daa3)
- localaze text in share modal [`df7b233`](https://gitlab.cobrain.io/team/eeg_viewer/commit/df7b2336b9b4436d18264dd609466648d6b8334f)
- keyCode -&gt; key [`dcd3b46`](https://gitlab.cobrain.io/team/eeg_viewer/commit/dcd3b46124c173838dfa51c2fb3174bf11db1f64)
- delete unused translation key [`1a44547`](https://gitlab.cobrain.io/team/eeg_viewer/commit/1a44547063ffed5f3630ef354ea6aa676cc1359d)
- don&#x27;t create labels without names [`bb85128`](https://gitlab.cobrain.io/team/eeg_viewer/commit/bb85128c74c4a0688a6cba026599e1c733b05d54)
- #65, #66 [`2678438`](https://gitlab.cobrain.io/team/eeg_viewer/commit/2678438996d86bd2b8b41d8dd76dc116b622f9fe)
- quick edit for new label [`27c2631`](https://gitlab.cobrain.io/team/eeg_viewer/commit/27c26314e7fe4bd032f3de58d6bf55020be47009)
- render if datarecords changed(initial render) [`39ddafb`](https://gitlab.cobrain.io/team/eeg_viewer/commit/39ddafb3a6cb3e073c5272f6222a016e1e2e3277)
- share and jump at time [`5edb1b3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/5edb1b30d52a755d11a6c40db490b0134e9ba849)
- annotation item - show only name if not edited [`fc4a6c3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/fc4a6c3432a10132371d196bca06a1f3973ac3f7)
- #54 Performance on large epochs improved by delaying render [`d4132e0`](https://gitlab.cobrain.io/team/eeg_viewer/commit/d4132e05f77b106033cab6da6382c981436386f3)
- #47 Fixed annotation loading [`6701da3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6701da32d9be4b850f613499f7d5a846e7c7848b)
- #50 Sorting annotations by time [`7ea5c82`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7ea5c82de767667fe90f07fb66bec6a90e666f10)
- #47 Scroll and navigate annotations [`cb92a99`](https://gitlab.cobrain.io/team/eeg_viewer/commit/cb92a99d1bb4160441d09010251b38a1d3ef6bd5)
- #47 Package cleanup [`fb4b0bb`](https://gitlab.cobrain.io/team/eeg_viewer/commit/fb4b0bb61f981370977d702a6b664cdd26ac8e69)
- #45 Bugfixes [`cdd9b9e`](https://gitlab.cobrain.io/team/eeg_viewer/commit/cdd9b9ee60e536937e294f5d5212de8ebfdcd6fd)
- #45 Partial loading [`c343a99`](https://gitlab.cobrain.io/team/eeg_viewer/commit/c343a994cfee7857e9bf980bf84e119b2a98ddd3)
- version up [`082b63a`](https://gitlab.cobrain.io/team/eeg_viewer/commit/082b63a30613a424a6e3c673145158e6d95cc436)
- fix plot ySpacing for bipolar montage [`ff050aa`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ff050aadc6d8081f0b1198772ccdafe460bd682a)
- biolar montage [`1b519a6`](https://gitlab.cobrain.io/team/eeg_viewer/commit/1b519a610821da9a7f1c7316ae15af8538ef0902)
- change compilation [`6f2b0e9`](https://gitlab.cobrain.io/team/eeg_viewer/commit/6f2b0e91a1f8a797714581b7680875f9383f7cdf)
- annotations now selectable in view [`a5a6f39`](https://gitlab.cobrain.io/team/eeg_viewer/commit/a5a6f3906d1e957b0c0afcb91ae4682d8f69eea0)
- API breaking changes - bumped package version [`91b1491`](https://gitlab.cobrain.io/team/eeg_viewer/commit/91b1491027d5f939cd3a677e8ba20a2cba96e82e)
- left side ruller [`b193028`](https://gitlab.cobrain.io/team/eeg_viewer/commit/b193028abce18ddf619241c42104e79569eb065b)
- EEG_VIEWER-39 Fix [`8f17a72`](https://gitlab.cobrain.io/team/eeg_viewer/commit/8f17a72467f853d0a77172b306ff4b2c8307870b)
- EEG_VIEWER-39 Рефакторинг загрузки аннотаций [`dc7407e`](https://gitlab.cobrain.io/team/eeg_viewer/commit/dc7407e0c7e6654efd7a52ca2180bd46cf5ea662)
- ruller [`d1f13da`](https://gitlab.cobrain.io/team/eeg_viewer/commit/d1f13da55157c95c12ba47f1b3f7ae065dbbf58e)
- custom reducer for history [`993133c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/993133ca333ca700a7c059e7e928ba19c81011a9)
- merge [`bb480da`](https://gitlab.cobrain.io/team/eeg_viewer/commit/bb480dacbf7f735cf2b8c21203a8fd50f9f088cd)
- add preview, change rendering [`471048c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/471048c2e93fe06caf18434308cd300199c15e32)
- EEG_VIEWER-37 Обеспечить загрузку больших (~500MB) файлов [`7b5b6fe`](https://gitlab.cobrain.io/team/eeg_viewer/commit/7b5b6fe5312dcb2c9569cb6cadd3534657789692)
- fix history [`732ce04`](https://gitlab.cobrain.io/team/eeg_viewer/commit/732ce0411f4fdd8faa2b5bef0c8a0fb40794040b)
- add installation manual [`a1f13cb`](https://gitlab.cobrain.io/team/eeg_viewer/commit/a1f13cb58dec87ddcd5c7df239b4acceb16c570b)
- improve speed [`146e66c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/146e66c3c45c28e5fa960cc401e67af856a6e261)
- history [`77ba1ba`](https://gitlab.cobrain.io/team/eeg_viewer/commit/77ba1ba804337cb843559245abedb60c109ff070)
- partial rendering for plot and tagging [`b206084`](https://gitlab.cobrain.io/team/eeg_viewer/commit/b2060841fbb353fe228b6c61ebb620d1c175f4c1)
- fix [`e08dc5c`](https://gitlab.cobrain.io/team/eeg_viewer/commit/e08dc5cca988bab160b1cec61933c0ff612ac4bb)
- init [`dff586b`](https://gitlab.cobrain.io/team/eeg_viewer/commit/dff586bd1597c813dfab859b39c795522b56cdff)
- uglify js while compilation, npm ignore source folder [`1c6161e`](https://gitlab.cobrain.io/team/eeg_viewer/commit/1c6161ec8830db44279487caf11e5d5a86a90ede)
- disable compilation, use as es6 module [`4c956e3`](https://gitlab.cobrain.io/team/eeg_viewer/commit/4c956e3cc7d999d91d5845758b303032fdee3f7c)
- change prepare [`e218f69`](https://gitlab.cobrain.io/team/eeg_viewer/commit/e218f69e8e2004c7edd8199bbd6803ec806afaf0)
- add prepare npm hook [`4d812e2`](https://gitlab.cobrain.io/team/eeg_viewer/commit/4d812e24fdb82469f353eecaaa350afd3c5c33ae)
- change main [`43a5994`](https://gitlab.cobrain.io/team/eeg_viewer/commit/43a59943c6b25cb3695cbf28376d8c849b3fa8da)
- move in src, compile in es5 [`3bd18ee`](https://gitlab.cobrain.io/team/eeg_viewer/commit/3bd18eedbeab0aa68ee58017dc8be935cc64af20)
- eeg_viewer [`ff910dc`](https://gitlab.cobrain.io/team/eeg_viewer/commit/ff910dce8596f431202fc5c2dd8dc953742ac221)
