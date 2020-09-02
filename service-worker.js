/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "19bcdd62cfd25ae057a350c92c36dab6"
  },
  {
    "url": "android-chrome-192x192.png",
    "revision": "0b234c1cf1ae1958f111579509cf52ee"
  },
  {
    "url": "android-chrome-256x256.png",
    "revision": "d257d914052dc3409eeeab27caa4267c"
  },
  {
    "url": "api/index.html",
    "revision": "b27d6fa38a82f5e8b54923b379ae6961"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "b731ba118d89e5652404d9e9d82a219e"
  },
  {
    "url": "argdown-arrow-white.svg",
    "revision": "188460ee31d1efa9eda2e89c485777ca"
  },
  {
    "url": "argdown-arrow.png",
    "revision": "16eb1c797a9fabfb08ad373009309b26"
  },
  {
    "url": "argdown-map.css",
    "revision": "e14d7c464380b548f8a15fc9cf491075"
  },
  {
    "url": "argdown-map.js",
    "revision": "f5198c14cc46952ba001d15c582e7781"
  },
  {
    "url": "argdown-mark.svg",
    "revision": "d3c4d784d8cc12c1cf9ccc4cdc149b13"
  },
  {
    "url": "argdown-viewer.js",
    "revision": "22c390fc8c2b3b18f4a837fd8e616656"
  },
  {
    "url": "assets/css/0.styles.94cc3220.css",
    "revision": "daf239817514a6f05d354a622d70779c"
  },
  {
    "url": "assets/img/argdown-vscode-greenspan-1.b6e85ee0.png",
    "revision": "b6e85ee01e7079435dfd9877642b01b0"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.9406c346.js",
    "revision": "78a17164b1fe63b3bfb88fa4ba4365b8"
  },
  {
    "url": "assets/js/11.e0481e2f.js",
    "revision": "77a1489af75cd6d278fc8d95ddd71d52"
  },
  {
    "url": "assets/js/12.c8c1f5d3.js",
    "revision": "9234e6301fdceed1a04addb27bac92bf"
  },
  {
    "url": "assets/js/13.11510537.js",
    "revision": "c20b7ec4d35ab066c60cf66a40dbc9ec"
  },
  {
    "url": "assets/js/14.4d7c4bea.js",
    "revision": "920d016944e25cfbb0aac75eb6e9d704"
  },
  {
    "url": "assets/js/15.ff9684ab.js",
    "revision": "d4135fed89c9006986c682e3dd6663d3"
  },
  {
    "url": "assets/js/16.0a28e154.js",
    "revision": "cb2363b96b18e2e3284efb9040f1895d"
  },
  {
    "url": "assets/js/17.2fb4502a.js",
    "revision": "751f8cfc30fd629f3ec378a055627bf8"
  },
  {
    "url": "assets/js/18.0bf43801.js",
    "revision": "ce9898fc56aa1e13e383ce67dc67ac23"
  },
  {
    "url": "assets/js/19.6b6bdc79.js",
    "revision": "bdc029eb9ab08a6338b0715549cd46b5"
  },
  {
    "url": "assets/js/20.b7391a62.js",
    "revision": "7eae38e1fd7ef108af347015c625a303"
  },
  {
    "url": "assets/js/21.4b5ffdee.js",
    "revision": "a43e57edf402444533ab9ab31a18d566"
  },
  {
    "url": "assets/js/22.7335d39d.js",
    "revision": "43911acf9c62c6aef816d6463123332a"
  },
  {
    "url": "assets/js/23.38b7b54b.js",
    "revision": "da1af6de61eded4c2158ad584babcc5f"
  },
  {
    "url": "assets/js/24.dc53ed0f.js",
    "revision": "293d5a23d0c9550a3e4a3dc87cc51e98"
  },
  {
    "url": "assets/js/25.8dd4763e.js",
    "revision": "a76352561eece2c802f21da87f5cf205"
  },
  {
    "url": "assets/js/26.d7aaa637.js",
    "revision": "82e3c89af33d2c8bf6cc9db8926f3adc"
  },
  {
    "url": "assets/js/27.426a5042.js",
    "revision": "ce5966f4ac4e272d5d91e19923967059"
  },
  {
    "url": "assets/js/28.c315f532.js",
    "revision": "ac5fb41a71b59a6effa6d10f2a45dd7c"
  },
  {
    "url": "assets/js/29.8752954b.js",
    "revision": "9f0659dede5385abfeb4c3b27eabd330"
  },
  {
    "url": "assets/js/3.b92dd5e0.js",
    "revision": "9633d2c7d8e90e41c6fa4679d813219d"
  },
  {
    "url": "assets/js/30.b6a940cd.js",
    "revision": "3e8317eb0194e8605025988e968fb1d6"
  },
  {
    "url": "assets/js/31.f5dea01b.js",
    "revision": "ed6ddefd9fd62246a93dca39ddeb2c36"
  },
  {
    "url": "assets/js/32.646a05fc.js",
    "revision": "746605d24991415d7c3f6bda43725629"
  },
  {
    "url": "assets/js/33.e9730d1d.js",
    "revision": "5b27233431cc2f1058583069579e847a"
  },
  {
    "url": "assets/js/34.88587521.js",
    "revision": "99ef8f2242ceb202d30d8744cb3fa562"
  },
  {
    "url": "assets/js/35.a5ab26d9.js",
    "revision": "e60fcfaccea39bf7004a39dc81861ffc"
  },
  {
    "url": "assets/js/36.13215199.js",
    "revision": "f375cc2b8ce347a112d5e10984598879"
  },
  {
    "url": "assets/js/37.8ce63dd5.js",
    "revision": "79531a8544c2a08dc3eb988246fccb29"
  },
  {
    "url": "assets/js/38.f8c78b17.js",
    "revision": "bc81cb125c046efa1e4b30fbadc879bc"
  },
  {
    "url": "assets/js/39.9a5f5493.js",
    "revision": "76a30b84b5f413c1b08268fae112c08f"
  },
  {
    "url": "assets/js/4.190456f5.js",
    "revision": "87da2db0fff74fe8568a0f5577b7424f"
  },
  {
    "url": "assets/js/40.07b3eaba.js",
    "revision": "7bf459eabf8ee14320062d84c905d6f1"
  },
  {
    "url": "assets/js/41.92aa08ce.js",
    "revision": "2a83b459ecc6590072e8e44990d9da30"
  },
  {
    "url": "assets/js/42.76c51e88.js",
    "revision": "013fd211b207eb052b612acab24f577a"
  },
  {
    "url": "assets/js/5.f604d11b.js",
    "revision": "1dd41cb77b72b6bf39e2df4dbc97ff7c"
  },
  {
    "url": "assets/js/6.ba9ab0cf.js",
    "revision": "50c2c83ccd3503eb95f74e36debfbc1c"
  },
  {
    "url": "assets/js/7.d1f1cc87.js",
    "revision": "fafe6bc84b98f30adc78f1402958f90e"
  },
  {
    "url": "assets/js/8.cec19f3e.js",
    "revision": "0b1369a82dc57ff8e18705b7000f8a84"
  },
  {
    "url": "assets/js/9.fe0542c3.js",
    "revision": "1b07c4c1c9de279a65012bb8932abd09"
  },
  {
    "url": "assets/js/app.5e6f00af.js",
    "revision": "6886085acd606420333d40463c726086"
  },
  {
    "url": "assets/js/vendors~docsearch.c6292dad.js",
    "revision": "1d9601606ba21eb8069023ccce91891b"
  },
  {
    "url": "changes/2018.html",
    "revision": "1942d1296107316ccf0f5dc457a70c9e"
  },
  {
    "url": "changes/2019.html",
    "revision": "f717f2fb3f04ec84e6f9b8e3403e20f2"
  },
  {
    "url": "changes/index.html",
    "revision": "d666da6c15cb2f41e339af387ccd6422"
  },
  {
    "url": "compress.svg",
    "revision": "c5fefc2d5586fb61f5a709a6280b94c7"
  },
  {
    "url": "expand.svg",
    "revision": "651a07980327d5bcbb8851c06761dc74"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "0838bbbe758ce024287a339ce2f20026"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "9a454f3ef2a188c19ccae92bc59f975c"
  },
  {
    "url": "favicon.svg",
    "revision": "0f1956d1eb23e082af85d779ee3d56ba"
  },
  {
    "url": "googleb41049b30bb73985.html",
    "revision": "e3ed96111974b98cc5f9dbd3a9f4f5d9"
  },
  {
    "url": "guide/a-first-example.html",
    "revision": "5a6188335f28e7f4e8b2ff09b27038cc"
  },
  {
    "url": "guide/changing-the-graph-layout.html",
    "revision": "b19aacc411e2309c5e34c9e66c29b3cd"
  },
  {
    "url": "guide/changing-the-node-size.html",
    "revision": "73a06648ad572159f07d54ad6f0a74d3"
  },
  {
    "url": "guide/changing-the-node-style.html",
    "revision": "7c5e024cf727974ab9d06a4693d35204"
  },
  {
    "url": "guide/colorizing-maps.html",
    "revision": "192c379747369a5123c8223ca20c1927"
  },
  {
    "url": "guide/configuration-cheatsheet.html",
    "revision": "688fce96fcb755b159bc95a619fef126"
  },
  {
    "url": "guide/configuration-in-the-frontmatter-section.html",
    "revision": "a95ab7da81d02f609a991400143471cf"
  },
  {
    "url": "guide/configuration-with-config-files.html",
    "revision": "e05ada504bade5749917fae585344e04"
  },
  {
    "url": "guide/configuration.html",
    "revision": "5c72a0054f890ea17bbba783bea6235b"
  },
  {
    "url": "guide/creating-argument-maps.html",
    "revision": "cf6690d4111eb07c8c5ebe2a3a7d4306"
  },
  {
    "url": "guide/creating-edges.html",
    "revision": "bfb06b344902dbdf7b4c7b1046e08af5"
  },
  {
    "url": "guide/creating-group-nodes.html",
    "revision": "0300594ccf10d0d36368b09ffde60f5c"
  },
  {
    "url": "guide/creating-statement-and-argument-nodes.html",
    "revision": "e820e650404f39c5dbdc3f46e242551e"
  },
  {
    "url": "guide/elements-of-an-argument-map.html",
    "revision": "160fc8a2aa9f6a1d6037ab3d5568ffe3"
  },
  {
    "url": "guide/embedding-your-maps-in-a-webpage.html",
    "revision": "10f873de0051ac3281e6ce68e85f365e"
  },
  {
    "url": "guide/extending-argdown.html",
    "revision": "256221d6c35ba6cb85b88fb7022a10fe"
  },
  {
    "url": "guide/index.html",
    "revision": "77259609e32f83ef44fa57de1bc88d8b"
  },
  {
    "url": "guide/installing-the-commandline-tool.html",
    "revision": "76e7f2c4f314ee68245b0834371634e3"
  },
  {
    "url": "guide/installing-the-vscode-extension.html",
    "revision": "bc568fa6da914d82aadd37de1bb8d9c4"
  },
  {
    "url": "guide/integrating-argdown-markdown-into-applications.html",
    "revision": "66d99a943e3174fcd3a4096bf2a5f436"
  },
  {
    "url": "guide/loading-custom-plugins-in-a-config-file.html",
    "revision": "0e9c87e9211b7066dc0ebcfda342d36a"
  },
  {
    "url": "guide/publishing-argdown-markdown-with-pandoc.html",
    "revision": "ec5e9f757b0df95e16ff9d7ad57a2113"
  },
  {
    "url": "guide/publishing-argument-maps.html",
    "revision": "875dfb20f8c8e5cec69b015aeca8fd44"
  },
  {
    "url": "guide/running-custom-processes.html",
    "revision": "4983910445971b88b782ac0d35b50407"
  },
  {
    "url": "guide/using-argdown-in-markdown.html",
    "revision": "7ec6d7b60ea1eb37dfe5ed3c0c1b5bfd"
  },
  {
    "url": "guide/using-argdown-in-your-application.html",
    "revision": "97a80ba2c1ff577d031eed9c4ba9f8d3"
  },
  {
    "url": "guide/using-logical-symbols-and-emojis.html",
    "revision": "2464d0ca7db6363eded1b8c163a9da24"
  },
  {
    "url": "guide/writing-custom-plugins.html",
    "revision": "a9dc3910969d8d0b3c9f3173b75a7ac0"
  },
  {
    "url": "index.html",
    "revision": "0fe1127a3f7e1e9f9571425bb86129bb"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "f1e527365592a25dd0039f28b0e2ae3c"
  },
  {
    "url": "river-deep.argdown-theme.css",
    "revision": "1dde29f17b6306f7f4da8df080e7c32d"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "2c742637dbf81b39dfe0870701ba5a6d"
  },
  {
    "url": "snow-in-spring.argdown-theme.css",
    "revision": "10500bb1a5555592f94b762a44e85ca9"
  },
  {
    "url": "syntax/index.html",
    "revision": "b8a993f1f9353c26460ab0a87fbde73d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
