if (!self.define) {
  let e,
    a = {};
  const f = (f, i) => (
    (f = new URL(f + '.js', i).href),
    a[f] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = f), (e.onload = a), document.head.appendChild(e);
        } else (e = f), importScripts(f), a();
      }).then(() => {
        let e = a[f];
        if (!e) throw new Error(`Module ${f} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const s =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (a[s]) return;
    let d = {};
    const t = (e) => f(e, s),
      b = { module: { uri: s }, exports: d, require: t };
    a[s] = Promise.all(i.map((e) => b[e] || t(e))).then((e) => (c(...e), d));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '33a481d241c6678d72027c2350b0394c',
        },
        {
          url: '/_next/static/50u3bxqzyLs_JMjIn-auq/_buildManifest.js',
          revision: '240256caf1b695856a048c21fd1d98bd',
        },
        {
          url: '/_next/static/50u3bxqzyLs_JMjIn-auq/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/186-99539262fe4b0cdd.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/4bd1b696-4ceebc30c6476b58.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/517-ee447e64986363a4.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/519-9257ba53c3a74e2a.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/9c4e2130-f2583a00285feada.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-6bbfbd211685ea16.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-6e9dfbedcd36fd25.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-2c16d1147c88e908.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/app/api/nutrition/route-9a93d70e34fcc8b4.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/app/layout-416d98308e68e5be.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/eec3d76d-882d72fed306f7fa.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/framework-881f0560c40ae817.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/main-app-6951923963da2346.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/main-dd6e9096dc8bd99a.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/pages/_app-d23763e3e6c904ff.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-963a7a5de53216bf.js',
          revision: '50u3bxqzyLs_JMjIn-auq',
        },
        {
          url: '/_next/static/css/3da11bad327eb979.css',
          revision: '3da11bad327eb979',
        },
        {
          url: '/_next/static/css/5edc114221e38018.css',
          revision: '5edc114221e38018',
        },
        {
          url: '/_next/static/css/6f363ef23d0d2487.css',
          revision: '6f363ef23d0d2487',
        },
        {
          url: '/_next/static/css/a58d97c47208dafb.css',
          revision: 'a58d97c47208dafb',
        },
        {
          url: '/_next/static/css/ae1b68097fd068a1.css',
          revision: 'ae1b68097fd068a1',
        },
        {
          url: '/_next/static/media/00f8f1f1daa560c5-s.woff2',
          revision: '0adb0250bc67f9aa5885b6e7a11b46d5',
        },
        {
          url: '/_next/static/media/00fb5cda79d81b7c-s.woff2',
          revision: 'fbeb4dc5804d1c5f963f49a00807840a',
        },
        {
          url: '/_next/static/media/01a0eb80500acc90-s.woff2',
          revision: '81306076730f1b30fd8bf3200963165a',
        },
        {
          url: '/_next/static/media/03bbceb33843bd9b-s.woff2',
          revision: '0426bd1e37c12ea7a3a8f32d0bf36233',
        },
        {
          url: '/_next/static/media/0484562807a97172-s.p.woff2',
          revision: 'b550bca8934bd86812d1f5e28c9cc1de',
        },
        {
          url: '/_next/static/media/0706533b90275744-s.woff2',
          revision: 'e7e78842b468289dee28f143217922d1',
        },
        {
          url: '/_next/static/media/082b1934e8e23eca-s.woff2',
          revision: 'fb39e93655b659aaca7d5ab840b01292',
        },
        {
          url: '/_next/static/media/08c7463867d1c52c-s.woff2',
          revision: 'ab448b545047f1942bf6f82c9ccaa115',
        },
        {
          url: '/_next/static/media/0a8e14315d7187eb-s.woff2',
          revision: '9b30eeb421da26f1ccdf15a59037deba',
        },
        {
          url: '/_next/static/media/0f36e50cfe173fbd-s.woff2',
          revision: '0078793339163305ec6960b9a364608b',
        },
        {
          url: '/_next/static/media/0f8f66669affdda6-s.woff2',
          revision: '1f60642875724350ea034ce4997065c9',
        },
        {
          url: '/_next/static/media/13499583bfbc5464-s.woff2',
          revision: '37f650afb858cfd5ef52e20c68f6588d',
        },
        {
          url: '/_next/static/media/139cadd6007659f1-s.woff2',
          revision: 'f2e37144a93ef6884a896d0414eed478',
        },
        {
          url: '/_next/static/media/198578841b8365de-s.woff2',
          revision: '2dc29b9e49f55e0f2ecc64d8e21626a0',
        },
        {
          url: '/_next/static/media/1a190b9dd5512d8a-s.woff2',
          revision: 'c1654f22bf33f3fee5540c49a66908d9',
        },
        {
          url: '/_next/static/media/1a7ef20fddcad937-s.woff2',
          revision: '245924b35ef7624c55c4c8341ddae49f',
        },
        {
          url: '/_next/static/media/1c19194c0743392a-s.woff2',
          revision: 'effaa7bdc67c9772ef55f0ee4d0b29af',
        },
        {
          url: '/_next/static/media/1cb24b342df1f25b-s.woff2',
          revision: '86d5bfbc43dc1728222490a0812459e0',
        },
        {
          url: '/_next/static/media/1d3acdd9467331a8-s.woff2',
          revision: '37edcb9d1837a83feac0ca2d7bac7fb0',
        },
        {
          url: '/_next/static/media/1eb6bb2da9b8ad87-s.woff2',
          revision: '94b18660225df84544d24ba38f46633d',
        },
        {
          url: '/_next/static/media/1eeab4221f640e0b-s.woff2',
          revision: 'a078e4c390293f657bca785e5fa52121',
        },
        {
          url: '/_next/static/media/1f46940006d871c1-s.woff2',
          revision: '33ccf013b0cd76cd6a3e1c9eed027be5',
        },
        {
          url: '/_next/static/media/1f73a8f043ff23bf-s.woff2',
          revision: 'e47f7962a4dd8a8d7e101bb7edb03b68',
        },
        {
          url: '/_next/static/media/1fd2c02d509ee8a9-s.woff2',
          revision: '68fe0fc4a012ad95ca5f775907125a35',
        },
        {
          url: '/_next/static/media/204ca8572923b981-s.woff2',
          revision: '70c87beeae9968cc8cd2a2949b6f4280',
        },
        {
          url: '/_next/static/media/2105cad50c3e7584-s.woff2',
          revision: 'f4fab1bac0322f8d3d5aa94a97872332',
        },
        {
          url: '/_next/static/media/2177d2eda684fae5-s.woff2',
          revision: '465e31af64c70bb7b3cb6011b0f62c85',
        },
        {
          url: '/_next/static/media/22e9642f3e8ae2a9-s.woff2',
          revision: 'acd511333792d7478cbe8c3ef798a58f',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/27b81caf7ecb9bd0-s.woff2',
          revision: 'd36ee0e0f490cc525b082f0ebef74ec5',
        },
        {
          url: '/_next/static/media/27c697502f4e767f-s.p.woff2',
          revision: '7f665316421202657be8542a6fb4cf60',
        },
        {
          url: '/_next/static/media/2b1fde0e95020eb7-s.woff2',
          revision: '9149f6607110d54d050ae17600f63ad1',
        },
        {
          url: '/_next/static/media/2b6ff3338729af71-s.woff2',
          revision: 'cb236ae9aea77266e993c1730ec45b9f',
        },
        {
          url: '/_next/static/media/2bcc402b9643846f-s.woff2',
          revision: '0df5b602064468c3b5e3ed1d8ae82119',
        },
        {
          url: '/_next/static/media/2e869b6f03689605-s.woff2',
          revision: '4881a52dbbc75634997ec66ce118c944',
        },
        {
          url: '/_next/static/media/2ef03002a8695b70-s.woff2',
          revision: '9564b3c10c88be85e7f0f24b62044ef0',
        },
        {
          url: '/_next/static/media/2f44907c5b5e3de0-s.woff2',
          revision: '3429743e6847996d4d13fc70f4c6aeb8',
        },
        {
          url: '/_next/static/media/2fe5ea1b6bc78a83-s.woff2',
          revision: 'd2fac73c84494483762922fc06dbf60f',
        },
        {
          url: '/_next/static/media/319a35f87b3f73f4-s.woff2',
          revision: 'ae9dc368071e4b14c448cb3dc19736bf',
        },
        {
          url: '/_next/static/media/333bd766be3cdda8-s.woff2',
          revision: 'abd37c6a298bdcee9ec8acfc61c56cf5',
        },
        {
          url: '/_next/static/media/349acdf0ed7a948b-s.woff2',
          revision: '50b8429b7f368123968d76763b3b02ff',
        },
        {
          url: '/_next/static/media/3515dcdf3e489890-s.woff2',
          revision: 'dfcf9653b89cdeec5bcf7d857898b41d',
        },
        {
          url: '/_next/static/media/3571dc36787e1fb7-s.woff2',
          revision: 'd1c8f4a4a24418d4dc5bb5a950660184',
        },
        {
          url: '/_next/static/media/358e6f042bbc7c6c-s.woff2',
          revision: '5fce86e2ba80ac1fce47f75ec7a40d49',
        },
        {
          url: '/_next/static/media/387838e4fdeac597-s.woff2',
          revision: '90e609d6e40cdb3e42677f923b10a6bd',
        },
        {
          url: '/_next/static/media/39d41506c7b5104c-s.woff2',
          revision: '3b96c1745d80e815c6624f6b258187bf',
        },
        {
          url: '/_next/static/media/39eaf2fc1a8fdf49-s.woff2',
          revision: 'b474c6eef6ee1e3293dcf7b36e96d686',
        },
        {
          url: '/_next/static/media/3b1f0b066af8473f-s.woff2',
          revision: '7a85bf43fa9c4328eb9f8d0a85ab5bb7',
        },
        {
          url: '/_next/static/media/3b6c77ee1d70f3c7-s.woff2',
          revision: '99cd331774cdc94e698e572b2da2aa53',
        },
        {
          url: '/_next/static/media/3bedc221a6bbc73b-s.woff2',
          revision: 'e5b44c508821d761d8b801bd569f9cfb',
        },
        {
          url: '/_next/static/media/3c42c52de313c4d5-s.woff2',
          revision: '2df769b502c5fcf640996119eb8ff176',
        },
        {
          url: '/_next/static/media/3fa88fe210d9e23b-s.woff2',
          revision: '2cc4e0409f2f245e5778d1fd341a0706',
        },
        {
          url: '/_next/static/media/429a09c9a2b2d5d6-s.woff2',
          revision: 'e7a521116d6639ed29d93e5e6528eb1e',
        },
        {
          url: '/_next/static/media/429e24214f40f3d1-s.woff2',
          revision: '1cb02988b6b2432826810ae2cd19f713',
        },
        {
          url: '/_next/static/media/43babc19cbe1724e-s.woff2',
          revision: '1c4f2ca542716275fdeca3232fc71c1a',
        },
        {
          url: '/_next/static/media/45bb3a2a94bd0114-s.woff2',
          revision: '5d454e75f0c8e2e3c5aa2cd206b7d930',
        },
        {
          url: '/_next/static/media/4605abb6e474bb84-s.woff2',
          revision: 'fca2270aa09c6d03c704f273378cce80',
        },
        {
          url: '/_next/static/media/467d807d15ac05d0-s.woff2',
          revision: '6a9f86d0a7f0991f3129f7051159fee0',
        },
        {
          url: '/_next/static/media/468dbbc2c32f6178-s.woff2',
          revision: '7dfb23448052c3537def514d8ea5517e',
        },
        {
          url: '/_next/static/media/4a93799898ea0289-s.woff2',
          revision: '5657a68e8697f7d0ebef1d8687e87940',
        },
        {
          url: '/_next/static/media/4c285fdca692ea22-s.p.woff2',
          revision: '42d3308e3aca8742731f63154187bdd7',
        },
        {
          url: '/_next/static/media/4ca45358c2443883-s.woff2',
          revision: '598955004db71eed8708f46665327718',
        },
        {
          url: '/_next/static/media/4f80f0c57485911c-s.woff2',
          revision: '8d905508db563b9a0b3d4442d33086dc',
        },
        {
          url: '/_next/static/media/50cfc336e1ad6076-s.woff2',
          revision: '70fcf80b6374c0a35a13ea7ddce52d91',
        },
        {
          url: '/_next/static/media/52a2b6ec644a3843-s.woff2',
          revision: '6ac501cd4c528a2c4c9a69d09096494a',
        },
        {
          url: '/_next/static/media/530f38d552a49ded-s.woff2',
          revision: 'b0a1f21a4da2413274342d44c00464b2',
        },
        {
          url: '/_next/static/media/530fa0637ae70013-s.woff2',
          revision: '30d41157f9c416bb5bace1cd93cd9fe7',
        },
        {
          url: '/_next/static/media/53a02b9dd0c8ac61-s.p.woff2',
          revision: '1e74fce90006a1cdd55a2b5f7f4506a6',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/55fa3fd3c72cf491-s.woff2',
          revision: 'e8a236cbde623f71ff10df5b1be3247b',
        },
        {
          url: '/_next/static/media/5673ca1be96aacf6-s.woff2',
          revision: '0173e18de9645534df0aceea3c2a0bd1',
        },
        {
          url: '/_next/static/media/56aef3458b01c6eb-s.woff2',
          revision: '832bbb4115049d83d0e0144e60b1993b',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/5987cedf78a299a4-s.woff2',
          revision: 'a78e47b6e2f55596a63beeb091874cb6',
        },
        {
          url: '/_next/static/media/59ba5a7761b876d4-s.woff2',
          revision: '0c861f8ca2026419866ff9035dcbe02e',
        },
        {
          url: '/_next/static/media/5ab0e9477c20afc1-s.woff2',
          revision: '4e6610669e04545913d17e330a7f6948',
        },
        {
          url: '/_next/static/media/5afc68065eab8737-s.woff2',
          revision: '6fac4ca84b42bb38340e38b9977baa8b',
        },
        {
          url: '/_next/static/media/5b85cfc6d3bc301a-s.woff2',
          revision: 'cb317031a52acad4232fc1ce7e5b3047',
        },
        {
          url: '/_next/static/media/5e05adceb587195f-s.woff2',
          revision: '2600730b6342a165455ac7a0a1084068',
        },
        {
          url: '/_next/static/media/5eba71443b06dffb-s.woff2',
          revision: '95277c9c53fad9fe5f292a3db9ad6242',
        },
        {
          url: '/_next/static/media/5fc9af938e04217b-s.woff2',
          revision: 'd49ff9f21e2e7c8fdc0345af9d047867',
        },
        {
          url: '/_next/static/media/60f8b92a5755190b-s.woff2',
          revision: '308679670c5e506bf3ab17827c610cb2',
        },
        {
          url: '/_next/static/media/614032f9d0d19f17-s.woff2',
          revision: 'f0a28fda8144b818782b7073641dfa80',
        },
        {
          url: '/_next/static/media/6398d2750e3160a8-s.woff2',
          revision: '072c5554ab12b5aaf559303be0747e9d',
        },
        {
          url: '/_next/static/media/65dc75d47e04f839-s.woff2',
          revision: '233fb5e6844507f231d0ed5fa7ff757c',
        },
        {
          url: '/_next/static/media/679af36cecc759b5-s.woff2',
          revision: '267956d595ebbc01c6926431af23a563',
        },
        {
          url: '/_next/static/media/6a36db0311a9e290-s.woff2',
          revision: 'ed0cd24cac08700df87a14af3667e2f0',
        },
        {
          url: '/_next/static/media/6afd320d6bbbe3b3-s.woff2',
          revision: 'cc43b4e5dd8032ec8d862e0a810b6e5e',
        },
        {
          url: '/_next/static/media/6b9edf717a7bfdad-s.woff2',
          revision: '4600987396d5a58346f69c53fd283506',
        },
        {
          url: '/_next/static/media/6be3c58a51fa8086-s.woff2',
          revision: '14e104f9306c056583ab46b0458f37fa',
        },
        {
          url: '/_next/static/media/6c28c5e4363997ab-s.woff2',
          revision: '26e8f30a1f2c07d78b0ec808bfb26a14',
        },
        {
          url: '/_next/static/media/6c56d6b9961a8f22-s.woff2',
          revision: 'cdd01d6a372fb1395aea64a372b99e50',
        },
        {
          url: '/_next/static/media/6c63cafb99771657-s.woff2',
          revision: '371a48f15e3a9c72b3497db467684d7c',
        },
        {
          url: '/_next/static/media/6c9a125e97d835e1-s.woff2',
          revision: '889718d692d5bfc6019cbdfcb5cc106f',
        },
        {
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/6da16a25cd948f3b-s.woff2',
          revision: 'd670edf69b97c22efb5be2d19ef02015',
        },
        {
          url: '/_next/static/media/72e65dfca68f885a-s.woff2',
          revision: '5ee4657dd9f42c5c6616239b5e25c8f8',
        },
        {
          url: '/_next/static/media/7413f86b81d84fef-s.woff2',
          revision: 'f5cdc2a690b2097101ee85ac2dd4ecbf',
        },
        {
          url: '/_next/static/media/74cf3782d74f7798-s.woff2',
          revision: '57235fd988ff009b9f6b24e8d085b687',
        },
        {
          url: '/_next/static/media/791ff58d43a7a659-s.woff2',
          revision: 'dd0acfc8ea36310c2bc0c14a507bf386',
        },
        {
          url: '/_next/static/media/79b8cc4c5a944996-s.woff2',
          revision: '10d584fdd637ad4ee63e143e29f01c1c',
        },
        {
          url: '/_next/static/media/7b245b333152f9c5-s.woff2',
          revision: '6a7c2f2d11dbe09c9ab2304480c8a411',
        },
        {
          url: '/_next/static/media/7bf9cbd8b025e6ce-s.woff2',
          revision: '348476c102137bafb52e1077adf55b6e',
        },
        {
          url: '/_next/static/media/7c54cfac00751df2-s.woff2',
          revision: '19b4f6304efaecc6ae7efae734ad6494',
        },
        {
          url: '/_next/static/media/7cb79df3e2d169f8-s.woff2',
          revision: 'ceac4dc7992355ebdf5e66a6e16f3fae',
        },
        {
          url: '/_next/static/media/7e1b26adf0a9612b-s.woff2',
          revision: '563d4a5dfc0a48c687faeea3b54e693d',
        },
        {
          url: '/_next/static/media/7f3033447cba2766-s.woff2',
          revision: '172fc94608aec868629345b9097de782',
        },
        {
          url: '/_next/static/media/8044abcf1bb2ad99-s.woff2',
          revision: 'fda1f8895965d5a9f30d8b0fc1087632',
        },
        {
          url: '/_next/static/media/83703df5507afec0-s.woff2',
          revision: '25d645c26cd5cff1ba2e5f05a9af0a83',
        },
        {
          url: '/_next/static/media/84e1a9fbe9853704-s.woff2',
          revision: '17248bab186037be73cd9b61d8df2e44',
        },
        {
          url: '/_next/static/media/8704d7ab2885d649-s.woff2',
          revision: 'a0109c3c08307ab01f9332229602a91b',
        },
        {
          url: '/_next/static/media/8888a3826f4a3af4-s.p.woff2',
          revision: '792477d09826b11d1e5a611162c9797a',
        },
        {
          url: '/_next/static/media/8c43e6608277cf79-s.woff2',
          revision: '51f874edad21fa9e826d9c6baa8505ed',
        },
        {
          url: '/_next/static/media/8caed38ee1484b26-s.woff2',
          revision: '6aced29b250b0b8720ad95e1186174b8',
        },
        {
          url: '/_next/static/media/8e272604d9a1a0fc-s.woff2',
          revision: 'df9dca630fa12ba71e259d179f59e0f0',
        },
        {
          url: '/_next/static/media/8e3d7a069c3758cc-s.woff2',
          revision: 'a78b36f1b7d712f84b89c7cd1f1af95c',
        },
        {
          url: '/_next/static/media/8f715cec785b56a0-s.woff2',
          revision: '870a3b57680043beb823d2bbc22bc313',
        },
        {
          url: '/_next/static/media/9056424cff9d7ce6-s.woff2',
          revision: '537a4f2a428e9c5e8e2c45fdb519c66f',
        },
        {
          url: '/_next/static/media/9188e242ef08da77-s.woff2',
          revision: '7aa475a95b75893b9502ff41f6151823',
        },
        {
          url: '/_next/static/media/91afe8735e66cfe1-s.woff2',
          revision: '8ceda6dffa7a0d08c2ee27738223ab49',
        },
        {
          url: '/_next/static/media/9318b13963ae0679-s.woff2',
          revision: '418212967e6ff7d79e74e8f7046dcf0d',
        },
        {
          url: '/_next/static/media/9390d34b4296748e-s.woff2',
          revision: 'adaeb5a5829e17a104b7fc23e4facab5',
        },
        {
          url: '/_next/static/media/9713bfd84329c61e-s.woff2',
          revision: 'ea4dacfaeb886a505b21fc821ada9365',
        },
        {
          url: '/_next/static/media/97a5d9037dfc2964-s.woff2',
          revision: 'e6850eb8e6d77f735e62c5f5d82b7d9a',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/980fb219a927b3ec-s.p.woff2',
          revision: 'c683c4fc6562af61f4b1620e40635793',
        },
        {
          url: '/_next/static/media/9810448ee63b8c29-s.woff2',
          revision: 'b2ca002cf2d9b8642f6bbbec5b9d9ba1',
        },
        {
          url: '/_next/static/media/990ff5f80f45da1a-s.woff2',
          revision: 'aaa53a0d05bdaa5b365ab51fbd5126b6',
        },
        {
          url: '/_next/static/media/992a0396e2b4f5b1-s.woff2',
          revision: '06229c7804613938554aae77076d7d66',
        },
        {
          url: '/_next/static/media/99d464a1385a64ac-s.woff2',
          revision: '5c40bb29939dbe03bdafa615994e5626',
        },
        {
          url: '/_next/static/media/9c23e59a0c4625c9-s.woff2',
          revision: '3872fc5bafa867c0d1379df9fb766fee',
        },
        {
          url: '/_next/static/media/9da66cb2cc35687e-s.woff2',
          revision: 'fc63fbe3c97f197ecbed167a57e55836',
        },
        {
          url: '/_next/static/media/9fe6a12835f153c1-s.woff2',
          revision: '0da9005b572128bb1f00982a29f0abaf',
        },
        {
          url: '/_next/static/media/a125f4066530dadd-s.woff2',
          revision: '4de18313b50eab0e4937a4875ae8461e',
        },
        {
          url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
          revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
        },
        {
          url: '/_next/static/media/a403c90166fa9208-s.woff2',
          revision: '85000f871ed106f1b7b20e8604d9e92c',
        },
        {
          url: '/_next/static/media/a7f73f9ae91daea3-s.woff2',
          revision: 'd1e064dfe6278eee632546c5ea03b4f1',
        },
        {
          url: '/_next/static/media/a86f5e65bb27087b-s.woff2',
          revision: '53f3794005ecaab698c60718212deefd',
        },
        {
          url: '/_next/static/media/adb38c67e5bd9000-s.woff2',
          revision: 'ebd2dfabdfc944548e7096ed756f6dda',
        },
        {
          url: '/_next/static/media/b22a4cb15ccb5a4c-s.woff2',
          revision: '07b0f616d6e7d7eb559ab7431ec73e4a',
        },
        {
          url: '/_next/static/media/b28d7f96009b98c8-s.woff2',
          revision: '455e79886505544d68aebd8beb16b55a',
        },
        {
          url: '/_next/static/media/b4e99548eec3e7e3-s.woff2',
          revision: '8be120afc376d3a339289370975e3b61',
        },
        {
          url: '/_next/static/media/b523b7ed4637dda2-s.woff2',
          revision: '6a3dfd501f70ca6e1534f671c272c5eb',
        },
        {
          url: '/_next/static/media/b5866022a24c850d-s.woff2',
          revision: 'fdae219d61ca1805645976dddb88c490',
        },
        {
          url: '/_next/static/media/b5b0c2bb15d1a531-s.woff2',
          revision: '62025f72e7d99b8bc4359782ca37e247',
        },
        {
          url: '/_next/static/media/b719f8853c811317-s.woff2',
          revision: 'e9c764a725d35f29259487d5b2d15912',
        },
        {
          url: '/_next/static/media/b720e08fc0489e8d-s.woff2',
          revision: '9afaa0c2a3004bdd0332c39764216e77',
        },
        {
          url: '/_next/static/media/b7c043fc111ea04c-s.woff2',
          revision: '3459d9613a75fcca560e7f0189599a57',
        },
        {
          url: '/_next/static/media/b8605ffda2c293dd-s.woff2',
          revision: 'bd860fe387de5f7fa78921714e42e080',
        },
        {
          url: '/_next/static/media/b8cc49c4b9251b5f-s.woff2',
          revision: '36badda528929fd7721063709821a0b9',
        },
        {
          url: '/_next/static/media/b8eb208df1b2f25e-s.woff2',
          revision: 'b13407e7b0eee21af3482ba920af1ab8',
        },
        {
          url: '/_next/static/media/b9549fcb84f94c79-s.woff2',
          revision: '2a138d14dbcf5cae5d6fda44c7ca5ceb',
        },
        {
          url: '/_next/static/media/b99e8bb3a430f36c-s.woff2',
          revision: 'fc77cc2f4828cf4847d7f01dec3a7bee',
        },
        {
          url: '/_next/static/media/bc8838dd9c1dd773-s.woff2',
          revision: 'b748d94ad75b4986f92e34f3a72d3d7f',
        },
        {
          url: '/_next/static/media/bf035beca271c9a5-s.woff2',
          revision: 'e11fda482b8fae7bd8bca61184345e2a',
        },
        {
          url: '/_next/static/media/bfb4c02ebd714c88-s.woff2',
          revision: '2fef6600329e7ff17a7e379026362341',
        },
        {
          url: '/_next/static/media/bfe7e279d03a479c-s.woff2',
          revision: '958cd659c358fa230fe32e50b5e8e6e9',
        },
        {
          url: '/_next/static/media/c1c4213c6352d476-s.woff2',
          revision: '2a39e95347fd306be809c92ac4e1abde',
        },
        {
          url: '/_next/static/media/c32eecd96c781de1-s.woff2',
          revision: 'e875e7ba788a6fa45fe945d7593647f0',
        },
        {
          url: '/_next/static/media/c3bc380753a8436c-s.woff2',
          revision: '5a1b7c983a9dc0a87a2ff138e07ae822',
        },
        {
          url: '/_next/static/media/c417d933dbcb7a68-s.woff2',
          revision: '0e813edd0ce1914b5db3e862451f4fbc',
        },
        {
          url: '/_next/static/media/c608e0c437d2a6fc-s.woff2',
          revision: 'f819f2a99ef2c7b9d63420ecfe090172',
        },
        {
          url: '/_next/static/media/c6e6ad476cf36dde-s.woff2',
          revision: 'b1f7a191b5e0c47073f85fe72f54bf75',
        },
        {
          url: '/_next/static/media/c6fa766eb717dccb-s.woff2',
          revision: '5737333696e0e3823c2eae7d88c6d647',
        },
        {
          url: '/_next/static/media/c775c6256bb8fe3c-s.woff2',
          revision: 'd1d8f535000597b457ec6d0929455bba',
        },
        {
          url: '/_next/static/media/c90180477de570fb-s.woff2',
          revision: '882e0e0c60e35becd1af57567905b4d6',
        },
        {
          url: '/_next/static/media/ca8dffbea5cc2a5d-s.woff2',
          revision: '54d354228fe66f360e69369409b59d49',
        },
        {
          url: '/_next/static/media/cc04a266478524d9-s.woff2',
          revision: 'b77e417a592b0187d2eb69a8860d1758',
        },
        {
          url: '/_next/static/media/cfa18a97de3631f7-s.woff2',
          revision: '5c2636b6dc81f273f5fd6a046c201467',
        },
        {
          url: '/_next/static/media/d261ed789f0f4e6d-s.woff2',
          revision: '88b46115c969a8b3c5c51e6f3e082c27',
        },
        {
          url: '/_next/static/media/d589f344beb26cdc-s.woff2',
          revision: 'a4dcd381d3828766ab988796e7fc6ca2',
        },
        {
          url: '/_next/static/media/d6c6647fc826e7fa-s.woff2',
          revision: 'ab4ce3f572d37d0558f1fa73893e2855',
        },
        {
          url: '/_next/static/media/d84af7a8329983d7-s.woff2',
          revision: 'd95a39954a7b90a9c0b4dd7bc6be019c',
        },
        {
          url: '/_next/static/media/d8546a333dba48b4-s.woff2',
          revision: '4129bbaa328fa780c623d364077f86f4',
        },
        {
          url: '/_next/static/media/db0cc798630856fa-s.woff2',
          revision: 'aa4cfe7085d82bb065ab14cbafe77d7f',
        },
        {
          url: '/_next/static/media/dcac8ea1d61718b5-s.woff2',
          revision: 'fbaf1ad46505e1764c78d8a60dbff4ef',
        },
        {
          url: '/_next/static/media/dcc35e32e4925d6e-s.woff2',
          revision: '4dfa108eff6421b090e7e5c3a9712015',
        },
        {
          url: '/_next/static/media/ddbadeeaa42c648c-s.woff2',
          revision: '2eeb6bf73a6aadc8dd488e3e21571735',
        },
        {
          url: '/_next/static/media/de9c5753c0dbfaef-s.woff2',
          revision: 'd46faeb9fad301c2cdcaf7ddff70a25d',
        },
        {
          url: '/_next/static/media/dedecf1453f3c20b-s.woff2',
          revision: 'cd08a2fa2c2354ba82cafd4fd9971390',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/df8c3b1de1ed7be9-s.woff2',
          revision: 'f6ed20dffda87e9d3aeafe69c1e67204',
        },
        {
          url: '/_next/static/media/e0767733ee0449e0-s.woff2',
          revision: '2c67935018942a867ef5caff02103058',
        },
        {
          url: '/_next/static/media/e22f2bc1cf553548-s.woff2',
          revision: '8eee3e813cb9f09cc5c0691d2dc830f9',
        },
        {
          url: '/_next/static/media/e2b40fa246300f01-s.woff2',
          revision: 'b2bb6b1750123c03f1b204604843293f',
        },
        {
          url: '/_next/static/media/e2c75a92fd39afbd-s.woff2',
          revision: 'a629e4dfc82b0262f5f7ccaab51408ca',
        },
        {
          url: '/_next/static/media/e3876e102f7bd6db-s.woff2',
          revision: '3a73bb87041bdff87a4db12356a61686',
        },
        {
          url: '/_next/static/media/e616f68d80e02a5a-s.woff2',
          revision: 'a967ce7febc5db7edf85eea66e747169',
        },
        {
          url: '/_next/static/media/e651abae5f2852bf-s.woff2',
          revision: 'c78c22cfc1b37c32af2d047d8c040b82',
        },
        {
          url: '/_next/static/media/e966af173fdd41fb-s.woff2',
          revision: 'e1d1033307b47f6a5cb6f5a0f1d20b83',
        },
        {
          url: '/_next/static/media/e984c82b3be7cde3-s.woff2',
          revision: '6f77234faf5366a21546abddf0d74c08',
        },
        {
          url: '/_next/static/media/e9e226f77d023c7a-s.woff2',
          revision: '15d67a8b8389382e9d79d3b01690c858',
        },
        {
          url: '/_next/static/media/eafabf029ad39a43-s.p.woff2',
          revision: '43751174b6b810eb169101a20d8c26f8',
        },
        {
          url: '/_next/static/media/eb33f45fa0fab2cf-s.woff2',
          revision: '7ac973d755953591f566b292aa82eef6',
        },
        {
          url: '/_next/static/media/ebf8f7f3e565d6f3-s.woff2',
          revision: '3375711fb84be9cf91a0e2fd39cf7033',
        },
        {
          url: '/_next/static/media/eda870144a059cc9-s.woff2',
          revision: 'e5c7a07b91a1e4bbf4cb5d8d5799bf29',
        },
        {
          url: '/_next/static/media/ee364219295e16df-s.woff2',
          revision: '081a453c3d5510e1bbfedeee7b7d1d28',
        },
        {
          url: '/_next/static/media/ef7cc9984b475a93-s.woff2',
          revision: '13798cbc4fe180c16707c92ef1e196ea',
        },
        {
          url: '/_next/static/media/efb74ea5725bacea-s.woff2',
          revision: '5aa9125dcdaf1b1c5acd1e9aae9b9cb7',
        },
        {
          url: '/_next/static/media/f10b8e9d91f3edcb-s.woff2',
          revision: '63af7d5e18e585fad8d0220e5d551da1',
        },
        {
          url: '/_next/static/media/f3885cd6b7855f19-s.woff2',
          revision: '29d937b6639419e2e3e7d1a60b1582a1',
        },
        {
          url: '/_next/static/media/f3c9d8f9326a1ed6-s.woff2',
          revision: '7c5c321e44d212febe5cc19925c354b8',
        },
        {
          url: '/_next/static/media/f646136737446507-s.woff2',
          revision: '769a3c52f7aff9a9b02b74b0f5a02efa',
        },
        {
          url: '/_next/static/media/f7d61b71fd946a20-s.woff2',
          revision: '063a1cc01c393267f20dd3be911ca528',
        },
        {
          url: '/_next/static/media/fae79e87145b7c65-s.woff2',
          revision: 'f8c62565ec1c41853af36887ca463f14',
        },
        {
          url: '/_next/static/media/fe0777f1195381cb-s.woff2',
          revision: 'f2a04185547c36abfa589651236a9849',
        },
        {
          url: '/_next/static/media/fe09749c3ec2d1af-s.woff2',
          revision: 'b149507605fe4b1faded38ec8376e209',
        },
        {
          url: '/_next/static/media/fe5f5f8bc8488dd7-s.woff2',
          revision: '7b96cb7a4e3c2805c1438e0021c54fea',
        },
        {
          url: '/_next/static/media/ff53880899466b78-s.woff2',
          revision: 'd8210c7aef7f1e7e3d1c0e6766a1020c',
        },
        {
          url: '/_next/static/media/ffc8a382283737b7-s.woff2',
          revision: '9a3863e8a7c2898f3ca384e1490f0c19',
        },
        {
          url: '/canieatthiscn.png',
          revision: '000783d889c02286817f7002a5f9dab9',
        },
        {
          url: '/canieatthisen.png',
          revision: 'c497126490f44dfb1c08474c0eba546e',
        },
        {
          url: '/icons/android-chrome-192x192.png',
          revision: '39509d4eb5015a3290a9b67c5502d8bb',
        },
        {
          url: '/icons/android-chrome-512x512.png',
          revision: 'c4c159032011dfbb30cef153a18b8c16',
        },
        {
          url: '/icons/apple-touch-icon.png',
          revision: '51ee02646a7fec87841fc732a3c055e9',
        },
        {
          url: '/icons/favicon-16x16.png',
          revision: '6cd8bf95eb4c2a486074d953189dfce7',
        },
        {
          url: '/icons/favicon-32x32.png',
          revision: 'a36e1a1f5baff2a9bb69e054854bdafa',
        },
        {
          url: '/icons/favicon.ico',
          revision: 'bee1ef671e0d4cf06575745c646daa1e',
        },
        {
          url: '/icons/site.webmanifest',
          revision: '053100cb84a50d2ae7f5492f7dd7f25e',
        },
        { url: '/manifest.json', revision: '1ed2bcd5c0086e11ffb3bbaf877adea4' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/smile.svg', revision: 'f688455bd97e91e9cd8f0e9e3b0996dd' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: f,
              state: i,
            }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
