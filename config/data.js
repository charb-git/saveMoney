const clazzList = [{
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "精选",
    "opt_id": 8569
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "男装",
    "opt_id": 743
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "鞋包",
    "opt_id": 1281
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "女装",
    "opt_id": 14
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "美妆",
    "opt_id": 16
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "运动",
    "opt_id": 1451
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "内衣",
    "opt_id": 1282
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "食品",
    "opt_id": 1
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "电器",
    "opt_id": 18
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "家纺",
    "opt_id": 818
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "母婴",
    "opt_id": 4
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "健康医药",
    "opt_id": 10223
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "百货",
    "opt_id": 15
  },
  {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "手机",
    "opt_id": 1543
  }, {
    "parent_opt_id": 0,
    "level": 1,
    "opt_name": "生活个护",
    "opt_id": 2946
  }
]
const mallList = [1261287, 467575, 1204287, 227322, 888964780, 46592, 226192, 154086, 1095524, 171838, 39959, 403473, 844957, 670038157, 810471, 538145, 573947547, 157224, 484446121, 767069834, 709912237, 109671, 393169460, 923847, 1829255, 784213, 578410380, 9332745, 806804805, 179365, 195449, 585849, 930886637, 6678153, 106832475, 184018, 761308, 1759926, 916704936, 298547, 726922, 252899018, 12350, 635755484, 24096, 590004392, 119989, 894784825, 1493841, 604892001, 572421, 2011373, 623985, 1165930, 345637646, 1211640, 756756, 205147, 543939840, 136077858, 798119, 718182, 6618510, 462822, 885062, 99438, 920028083, 440661, 782652931, 713992, 132677, 577735052, 598595, 458071804, 2133891, 1479123, 953225914, 134096513]
const mallImg = {
  1261287: "https://t16img.yangkeduo.com/pdd_ims/054901864b855680e498c50e0f12cae8.jpg",
  467575: "https://t00img.yangkeduo.com/goods/images/2019-07-14/1534456e-2e85-47d4-af18-77fce5fa8a0e.png",
  1204287: "https://t16img.yangkeduo.com/pdd_ims/20cb0dc0c1ea4319b6127595c8341a06.jpeg",
  227322: "https://t16img.yangkeduo.com/pdd_ims/1048512ccbf11d0780ed06fab30b59ee.jpg",
  888964780: "https://t00img.yangkeduo.com/goods/images/2018-09-06/a0a45a241bf235c961ed3f4dd1d628f3.jpeg",
  46592: "https://t16img.yangkeduo.com/pdd_ims/77f9daf4626152273ac6a5961b8c0062.jpg",
  226192: "https://t16img.yangkeduo.com/pdd_ims/dc9106f584aacfd475a5bc87051be63b.jpg",
  154086: "https://t16img.yangkeduo.com/pdd_ims/94ba58e762d7c2e90cb0bafa63d987e5.jpg",
  1095524: "https://t16img.yangkeduo.com/pdd_ims/ea43f691a650a67439d9d14228770028.jpg",
  171838: "https://t16img.yangkeduo.com/pdd_ims/3da0e458a62a91f4e5720d1b3c932a1f.jpg",
  39959: "https://t16img.yangkeduo.com/pdd_ims/65070f39074444353ad1772fef43bc32.jpg",
  403473: "https://t00img.yangkeduo.com/goods/images/2019-07-08/23826172-93d6-4d54-b100-1e4477647827.jpg",
  844957: "https://t16img.yangkeduo.com/pdd_ims/272e1455756c1dbfad5f888bbcbb3d30.jpg",
  670038157: "https://t00img.yangkeduo.com/goods/images/2019-02-18/980f9793-e88f-4adf-857a-b95e7189ae71.jpg",
  810471: "https://t16img.yangkeduo.com/pdd_ims/586d79c96c5d99efb830ea80343db032.jpg",
  538145: "https://omsproductionimg.yangkeduo.com/images/2018-07-01/fe3e14ff00b09afd9769c72ba6a09e13.png",
  573947547: "https://t16img.yangkeduo.com/pdd_ims/2019-04-21/70cbbf4c-57b8-42bc-a7ca-dc63b5a11772.png",
  157224: "https://t16img.yangkeduo.com/pdd_ims/7bf10a0cbe8fcc882432a20078790b9c.jpg",
  484446121: "https://t16img.yangkeduo.com/img_check/2018-12-26/4e80b2fe90945075caf50cd71d84379b.jpg",
  767069834: "https://t16img.yangkeduo.com/img_check/2019-03-30/bd9d38a26b86fafc88cd2dbbc7ba5f61.jpg",
  709912237: "https://t00img.yangkeduo.com/goods/images/2019-04-29/cafb2027-9ae8-437f-9a66-3287efba769a.png",
  109671: "https://t00img.yangkeduo.com/goods/images/2019-08-04/c0d6e693-fd5f-498d-8186-71ab79784138.jpg",
  393169460: "https://t00img.yangkeduo.com/goods/images/2018-10-11/d6b0fa95f3f26cac93f5a04eaae9acff.jpeg",
  923847: "https://t16img.yangkeduo.com/pdd_ims/96d8537c050eef2c76c479ab334fe21e.jpg",
  1829255: "https://t16img.yangkeduo.com/pdd_ims/b8bd6f6bbf66538a0bcbf690e0121ef8.jpg",
  784213: "https://t00img.yangkeduo.com/goods/images/2019-04-24/47e48500-fc94-4b73-ad61-f5213eabc6a1.jpg",
  578410380: "https://t00img.yangkeduo.com/goods/images/2019-04-18/c9426ecf-fd3b-4b54-8127-5db751c43006.jpg",
  9332745: "https://t00img.yangkeduo.com/goods/images/2019-07-17/22896c9a-3a8a-4475-8bf7-55bb46181010.jpg",
  806804805: "https://t16img.yangkeduo.com/img_check/2019-03-14/f3ae20b476a9d2acdc9abd8e4d9eec07.jpg",
  179365: "https://t00img.yangkeduo.com/goods/images/2019-05-18/a099e4aa-f0d5-48cc-aadd-f47d0f562c4d.jpg",
  195449: "https://t16img.yangkeduo.com/pdd_ims/ca6b68964be827bbaefe5bd2b280164e.jpg",
  585849: "https://t16img.yangkeduo.com/pdd_ims/d8ae4c37d1599627c29761588b2f4d50.jpg",
  930886637: "https://t16img.yangkeduo.com/img_check/2018-12-24/f34bd703bb982e15e4ebf36107e0d420.jpg",
  6678153: "https://t16img.yangkeduo.com/pdd_ims/mainObject/v1/pub_2019080401ca0ec515ee4e88ab0ab0b128441dcf.jpg",
  106832475: "https://t16img.yangkeduo.com/img_check/2019-01-23/aa93bfd2ebd6f270139a6d655afccc49.jpg",
  184018: "https://t00img.yangkeduo.com/goods/images/2019-05-27/2cebedbd-6453-480a-83b7-182f92b892dd.jpg",
  761308: "https://t16img.yangkeduo.com/pdd_ims/mainObject/v1/pub_20190716a6dd3696c97b428cba8f7d94886799ce.jpg",
  1759926: "https://t16img.yangkeduo.com/pdd_ims/049e26cb8abf46ccb63d43ba55f18e97.jpg",
  916704936: "https://t16img.yangkeduo.com/img_check/2018-12-13/40d39b1aa04894707a0bdf8f22a8d1b9.jpg",
  298547: "https://t16img.yangkeduo.com/pdd_ims/879c472b7130eff747a1fbf00f018159.jpg",
  726922: "https://t16img.yangkeduo.com/pdd_ims/b9754291af883b15188576b414467bdd.jpg",
  252899018: "https://t16img.yangkeduo.com/img_check/2018-11-25/a4d6acb936bf713dc8d9b2144432d8cb.jpg",
  12350: "https://t16img.yangkeduo.com/pdd_ims/c5f07272c2264d437b5f412baf829dcanew.png",
  635755484: "https://t16img.yangkeduo.com/img_check/2019-02-26/73f4bf8b672ad63e4d528902ce20d299.jpg",
  24096: "https://t00img.yangkeduo.com/goods/images/2018-11-14/27029a348539b149cb3264dc770a1640.jpeg",
  590004392: "https://t00img.yangkeduo.com/goods/images/2019-01-04/f03e98307716a0192c43c2ce7a6eb10c.jpeg",
  119989: "https://t16img.yangkeduo.com/pdd_ims/bbcaca659c779cecd7eb570112eb51fd.jpg",
  894784825: "https://t00img.yangkeduo.com/goods/images/2019-03-17/ee26ca7d-0251-4ccb-b4c3-ab70e241ab5f.jpg",
  1493841: "https://t16img.yangkeduo.com/pdd_ims/1c57c2439001d62544990a795a1e1c97.png",
  604892001: "https://t00img.yangkeduo.com/goods/images/2018-09-08/dbfe2a87cad4f8d66d92d61e1a494f40.jpeg",
  572421: "https://t16img.yangkeduo.com/pdd_ims/408717eea566e1744a41d828493a7554.jpg",
  2011373: "https://t16img.yangkeduo.com/pdd_ims/7a7e947ad763b53d81463a1bd7df5064.png",
  623985: "https://t16img.yangkeduo.com/pdd_ims/61c4a88b4ea612a0dc0eb08c32a07ffc.jpg",
  1165930: "https://t16img.yangkeduo.com/pdd_ims/65e804c0c3164f4b2f0a05dc2549b83c.jpg",
  345637646: "https://t00img.yangkeduo.com/goods/images/2019-03-01/964eac63-0314-4988-87b8-1bd322312588.jpg",
  1211640: "https://t16img.yangkeduo.com/pdd_ims/cdab80ed7291bf6543d8be1ec5ebd07d.jpg",
  756756: "https://t16img.yangkeduo.com/pdd_ims/9ac89c036412257e0a0836217f998f77.jpg",
  205147: "https://t16img.yangkeduo.com/pdd_ims/c39346fcdfa289d16de40cbb87cca582.jpg",
  543939840: "https://t16img.yangkeduo.com/img_check/2019-03-10/39bc8905a1a842538694c5a9db1010b8.jpg",
  136077858: "https://t16img.yangkeduo.com/img_check/2019-03-17/0dd4bcd26579891698a7d1352965eff1.jpg",
  798119: "https://t16img.yangkeduo.com/pdd_ims/f6288c030bea3fbd30c743990c24ca74.jpg",
  718182: "https://t16img.yangkeduo.com/pdd_ims/e64e532287dc2990c15f321064d3fb15.jpg",
  6618510: "https://t16img.yangkeduo.com/pdd_ims/eedbc0ab7c9c6b5f4bbf262e78af2c9b.jpg",
  462822: "https://t16img.yangkeduo.com/pdd_ims/64103232cadeb1abf91ef805e0e8fcef.jpg",
  885062: "https://t16img.yangkeduo.com/pdd_ims/bdd63a36f4ec3a082c8a438d749040f2.jpg",
  99438: "https://t16img.yangkeduo.com/pdd_ims/160d663d938c922ab1d8461fe25fffef.jpg",
  920028083: "https://t16img.yangkeduo.com/pdd_ims/7634f3b137efe28c3db2098053f8cc8a.jpg",
  440661: "https://t16img.yangkeduo.com/pdd_ims/fb238124aa32d330c4bf0c655949170c.jpg",
  782652931: "https://t00img.yangkeduo.com/goods/images/2018-09-07/ad8c51f647b954639c8b753592be8e3a.jpeg",
  713992: "https://t16img.yangkeduo.com/pdd_ims/cc690db2db9cd45e59dbecc75b3fd7ee.jpg",
  132677: "https://t00img.yangkeduo.com/goods/images/2019-05-17/5f1e9616-7fbe-4a6c-af48-b3257c354903.jpg",
  577735052: "https://t16img.yangkeduo.com/img_check/2019-05-28/7aa8afd0290596501daedb65eb1eaf91.jpg",
  598595: "https://t16img.yangkeduo.com/pdd_ims/7ac571ecc562a8a810c463971a3f2059.jpg",
  458071804: "https://t16img.yangkeduo.com/img_check/2019-01-10/aba5190e40e0c3fb4ba6704b7d98a825.jpg",
  2133891: "https://t16img.yangkeduo.com/img_check/2018-10-25/a4537d11ace306d18fa04235a603809b.jpg",
  1479123: "https://t16img.yangkeduo.com/pdd_ims/6177b58d5449296f51f3b4ab7e15cc37.jpg",
  953225914: "https://t00img.yangkeduo.com/goods/images/2019-01-06/58b091312abfaa785692e28e8c9dd79d.jpeg",
  134096513: "https://t16img.yangkeduo.com/pdd_ims/52c5653068baa3f02f33c50f7ce175ab.jpg"
}
module.exports = {
  clazzList: clazzList,
  mallList: mallList,
  mallImg: mallImg,

}